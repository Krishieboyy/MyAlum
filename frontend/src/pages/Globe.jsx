import { useEffect, useRef, useState, useMemo } from "react";
import Globe from "globe.gl";
import { alumni, branches } from "../data/mockData";
import { getCoordinates } from "../data/geodata";
import { serif, mono } from "../theme";
import { X, Globe as GlobeIcon, Filter, MapPin, Users, ExternalLink, RefreshCw } from "lucide-react";

export default function GlobePage() {
  const [selectedCity, setSelectedCity] = useState(null);
  const [filters, setFilters] = useState({
    batch: "all",
    branch: "all",
    country: "all",
  });
  const [showFilters, setShowFilters] = useState(true); // Default filters open for discovery
  const [globeLoading, setGlobeLoading] = useState(true);

  const globeContainerRef = useRef(null);
  const globeInstanceRef = useRef(null);

  // Vivid stepped density palette — clear distinction between city sizes
  const densityColor = (count) => {
    if (count >= 10) return "#ff2e63"; // hot magenta — major hub
    if (count >= 6)  return "#ff8c42"; // orange — large
    if (count >= 3)  return "#ffd23f"; // gold — medium
    return "#21d4fd";                  // electric cyan — small
  };
  const densityRGB = (count) => {
    if (count >= 10) return "255,46,99";
    if (count >= 6)  return "255,140,66";
    if (count >= 3)  return "255,210,63";
    return "33,212,253";
  };

  // Aggregate alumni by city
  const alumniByCity = useMemo(() => {
    const grouped = {};
    alumni.forEach(person => {
      const key = `${person.currentCity}|${person.currentCountry}`;
      if (!grouped[key]) {
        grouped[key] = {
          city: person.currentCity,
          country: person.currentCountry,
          alumni: [],
          coords: getCoordinates(person.currentCity),
        };
      }
      grouped[key].alumni.push(person);
    });
    return Object.values(grouped);
  }, []);

  // Filter alumni based on selected filters
  const filteredCities = useMemo(() => {
    return alumniByCity
      .map(cityData => ({
        ...cityData,
        alumni: cityData.alumni.filter(person => {
          if (filters.batch !== "all" && `${person.startYear}-${person.endYear}` !== filters.batch) return false;
          if (filters.branch !== "all" && person.branch !== filters.branch) return false;
          if (filters.country !== "all" && person.currentCountry !== filters.country) return false;
          return true;
        }),
      }))
      .filter(cityData => cityData.alumni.length > 0);
  }, [filters, alumniByCity]);

  const selectedCityData = selectedCity ? filteredCities.find(c => `${c.city}|${c.country}` === selectedCity) : null;
  const filteredAlumniCount = useMemo(() => filteredCities.reduce((sum, c) => sum + c.alumni.length, 0), [filteredCities]);

  // Get unique batches, countries for filters
  const uniqueBatches = ["all", ...new Set(alumni.map(a => `${a.startYear}-${a.endYear}`))];
  const uniqueCountries = ["all", ...new Set(alumni.map(a => a.currentCountry))];

  // Initialize Globe
  useEffect(() => {
    if (!globeContainerRef.current) return;

    // Instantiate vanilla Globe.gl with a full-color satellite texture
    const globe = Globe()(globeContainerRef.current)
      .globeImageUrl("//unpkg.com/three-globe/example/img/earth-blue-marble.jpg")
      .bumpImageUrl("//unpkg.com/three-globe/example/img/earth-topology.png")
      .backgroundImageUrl("//unpkg.com/three-globe/example/img/night-sky.png")
      .backgroundColor("#060a1a")
      .showAtmosphere(true)
      .atmosphereColor("#5eb3ff") // soft blue atmospheric halo
      .atmosphereAltitude(0.22);

    globeInstanceRef.current = globe;

    // Give the oceans a subtle shine and lift the terrain relief
    const globeMaterial = globe.globeMaterial();
    globeMaterial.bumpScale = 12;
    if (globeMaterial.shininess !== undefined) globeMaterial.shininess = 8;

    // Warm sun-like directional light for richer color
    setTimeout(() => {
      const scene = globe.scene();
      const dirLight = scene.children.find(o => o.type === "DirectionalLight");
      if (dirLight) { dirLight.intensity = 1.1; dirLight.position.set(1, 1, 1); }
      const ambient = scene.children.find(o => o.type === "AmbientLight");
      if (ambient) ambient.intensity = 1.4;
    }, 0);

    globe.onGlobeReady(() => {
      setGlobeLoading(false);
    });

    // Configure controls — wider zoom range
    const controls = globe.controls();
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.35;
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.minDistance = 110;  // zoom right down to city level
    controls.maxDistance = 800;  // pull far out to see the whole planet
    controls.zoomSpeed = 1.4;

    // Auto rotation pauses when user interacts
    const handleStartInteraction = () => {
      controls.autoRotate = false;
    };
    controls.addEventListener("start", handleStartInteraction);

    // Dynamic sizing via ResizeObserver
    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        if (width && height) {
          globe.width(width).height(height);
        }
      }
    });
    resizeObserver.observe(globeContainerRef.current);

    // Entrance Glide: Start zoomed out and glide in smoothly
    globe.pointOfView({ lat: 20, lng: 77, altitude: 3.5 }, 0);
    const cameraGlideTimer = setTimeout(() => {
      globe.pointOfView({ lat: 20, lng: 77, altitude: 2.1 }, 2200);
    }, 150);

    return () => {
      clearTimeout(cameraGlideTimer);
      resizeObserver.disconnect();
      controls.removeEventListener("start", handleStartInteraction);
      if (globeContainerRef.current) {
        globeContainerRef.current.innerHTML = "";
      }
    };
  }, []);

  // Update globe layers (bars, rings, labels) when filtered data changes
  useEffect(() => {
    const globe = globeInstanceRef.current;
    if (!globe) return;

    const globeData = filteredCities.map(city => ({
      lat: city.coords.lat,
      lng: city.coords.lng,
      city: city.city,
      country: city.country,
      alumniCount: city.alumni.length,
      alumni: city.alumni,
    }));

    const maxAlumni = Math.max(...globeData.map(d => d.alumniCount), 1);

    const tooltip = (d) => `
      <div style="
        background: rgba(10, 14, 30, 0.94);
        border: 1px solid rgba(${densityRGB(d.alumniCount)}, 0.6);
        padding: 9px 13px; border-radius: 8px; color: #f1f5f9;
        font-family: sans-serif;
        box-shadow: 0 12px 36px rgba(0,0,0,0.7); pointer-events: none;
      ">
        <div style="font-weight: 600; font-size: 13.5px; margin-bottom: 4px;">${d.city}, ${d.country}</div>
        <div style="font-size: 12px; color: #cbd5e1; font-family: monospace; display:flex; align-items:center; gap:6px;">
          <span style="display:inline-block; width: 9px; height: 9px; border-radius: 50%; background: ${densityColor(d.alumniCount)}; box-shadow: 0 0 8px ${densityColor(d.alumniCount)};"></span>
          <strong style="color:${densityColor(d.alumniCount)}">${d.alumniCount}</strong> ${d.alumniCount === 1 ? "alumnus" : "alumni"}
        </div>
      </div>`;

    // ── Glowing density bars ──
    globe
      .pointsData(globeData)
      .pointLat("lat")
      .pointLng("lng")
      .pointColor(d => densityColor(d.alumniCount))
      .pointAltitude(d => 0.05 + (d.alumniCount / maxAlumni) * 0.5)
      .pointRadius(d => 0.32 + (d.alumniCount / maxAlumni) * 0.55)
      .pointResolution(18)
      .pointsMerge(false)
      .pointLabel(tooltip)
      .onPointClick(d => {
        if (!d) return;
        setSelectedCity(`${d.city}|${d.country}`);
        globe.pointOfView({ lat: d.lat, lng: d.lng, altitude: 1.5 }, 1100);
      })
      .onPointHover(obj => {
        if (globeContainerRef.current) globeContainerRef.current.style.cursor = obj ? "pointer" : "grab";
      });

    // ── Pulsing rings — denser cities pulse faster & wider ──
    globe
      .ringsData(globeData)
      .ringLat("lat")
      .ringLng("lng")
      .ringColor(d => {
        const rgb = densityRGB(d.alumniCount);
        return (t) => `rgba(${rgb}, ${Math.sqrt(1 - t).toFixed(3)})`;
      })
      .ringMaxRadius(d => 1.4 + (d.alumniCount / maxAlumni) * 4)
      .ringPropagationSpeed(2)
      .ringRepeatPeriod(d => 1600 - (d.alumniCount / maxAlumni) * 900);

    // ── City labels riding on top of the bars ──
    globe
      .labelsData(globeData)
      .labelLat("lat")
      .labelLng("lng")
      .labelText(d => d.city)
      .labelSize(d => 0.5 + (d.alumniCount / maxAlumni) * 0.7)
      .labelDotRadius(0)
      .labelColor(d => `rgba(255,255,255,${0.55 + (d.alumniCount / maxAlumni) * 0.4})`)
      .labelResolution(2)
      .labelAltitude(d => 0.05 + (d.alumniCount / maxAlumni) * 0.5 + 0.012)
      .labelIncludeDot(false)
      .onLabelClick(d => {
        if (!d) return;
        setSelectedCity(`${d.city}|${d.country}`);
        globe.pointOfView({ lat: d.lat, lng: d.lng, altitude: 1.5 }, 1100);
      });
  }, [filteredCities]);

  return (
    <div style={{ background: "var(--paper)", minHeight: "100vh", transition: "background 300ms" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "36px 28px" }}>

        {/* Header */}
        <div style={{ marginBottom: 28, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
              <GlobeIcon style={{ width: 30, height: 30, color: "var(--blue)" }} />
              <h1 style={{ fontFamily: "var(--font-sans)", fontSize: 36, fontWeight: 700, color: "var(--ink)", margin: 0, letterSpacing: "-0.025em", lineHeight: 1.1 }}>
                Global Alumni Network
              </h1>
            </div>
            <p style={{ fontSize: 16, color: "var(--sub)", margin: 0, lineHeight: 1.5 }}>
              Interactive 3D representation of where IIT Guwahati graduates are making an impact worldwide
            </p>
          </div>
          
          {/* Legend indicator */}
          <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
            {[
              { color: "#ff2e63", label: "Major hub · 10+" },
              { color: "#ff8c42", label: "Large · 6–9" },
              { color: "#ffd23f", label: "Medium · 3–5" },
              { color: "#21d4fd", label: "Small · 1–2" },
            ].map(({ color, label }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 10px", background: "var(--surface)", border: "1px solid var(--rule)", borderRadius: 20, fontSize: 12, fontWeight: 500, color: "var(--sub)" }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: color, flexShrink: 0 }} />
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6">

          {/* 3D WebGL Globe Visual Panel */}
          <div style={{
            background: "#020617", // Explicit dark space background for the WebGL scene
            border: "1px solid var(--rule)",
            borderRadius: 8,
            position: "relative",
            height: "600px",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
            overflow: "hidden", // ensures no canvas bleed
          }}>
            {/* Globe loading state indicator overlay */}
            {globeLoading && (
              <div style={{
                position: "absolute",
                top: 0, left: 0, right: 0, bottom: 0,
                background: "rgba(15, 23, 42, 0.92)",
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                zIndex: 10,
                gap: 16,
                backdropFilter: "blur(4px)",
                transition: "opacity 300ms ease"
              }}>
                <div className="animate-shimmer" style={{ width: 64, height: 64, borderRadius: "50%", background: "#1e293b", border: "1px solid #38bdf8" }} />
                <span style={{ color: "#f1f5f9", fontSize: 13, fontWeight: 500, fontFamily: "var(--font-mono)", letterSpacing: "0.05em" }}>
                  INITIALIZING 3D WEBGL GLOBE...
                </span>
              </div>
            )}

            {/* Globe canvas render target - absolutely positioned within padding limits */}
            <div 
              ref={globeContainerRef} 
              style={{ 
                position: "absolute",
                top: 16,
                left: 16,
                right: 16,
                bottom: 16,
                borderRadius: 6, 
                overflow: "hidden" 
              }} 
            />

            {/* Premium HUD instructions overlay */}
            <div style={{
              position: "absolute",
              bottom: 24,
              left: 24,
              background: "rgba(15, 23, 42, 0.8)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: 6,
              padding: "10px 14px",
              fontSize: 11,
              color: "#94a3b8",
              pointerEvents: "none",
              display: "flex",
              flexDirection: "column",
              gap: 4,
              backdropFilter: "blur(6px)",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)"
            }}>
              <span style={{ fontWeight: 600, color: "#f1f5f9", marginBottom: 2 }}>🌐 CONTROLS</span>
              <span>🖱️ Drag to rotate · scroll to zoom in/out</span>
              <span>🏙️ Taller, warmer bars = more alumni</span>
              <span>👆 Hover a city for details · click to expand</span>
            </div>
          </div>

          {/* Controls and Sidebar Panels */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            {/* Filter Toggle Panel */}
             <div style={{
              background: "var(--surface)",
              border: "1px solid var(--rule)",
              borderRadius: "var(--radius-card)",
              padding: 16,
              boxShadow: "0 1px 2px rgba(0,0,0,.04)"
            }}>
              <button
                onClick={() => setShowFilters(!showFilters)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "8px 10px",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "var(--ink)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Filter size={14} style={{ color: "var(--blue)" }} />
                  <span>Network Filters</span>
                </div>
                <span style={{ fontSize: 10, color: "var(--sub)" }}>{showFilters ? "Collapse" : "Expand"}</span>
              </button>

              {showFilters && (
                <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 12, borderTop: "1px solid var(--rule)", paddingTop: 12 }}>
                  <div>
                    <label style={{ ...mono, fontSize: 10, color: "var(--sub)", letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: 6 }}>
                      Batch Range
                    </label>
                    <select
                      value={filters.batch}
                      onChange={(e) => setFilters({ ...filters, batch: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "8px",
                        fontSize: 12,
                        border: "1px solid var(--rule)",
                        borderRadius: 4,
                        background: "var(--paper)",
                        color: "var(--ink)",
                        outline: "none"
                      }}
                    >
                      {uniqueBatches.map(batch => (
                        <option key={batch} value={batch}>
                          {batch === "all" ? "All Batches" : batch}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={{ ...mono, fontSize: 10, color: "var(--sub)", letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: 6 }}>
                      Academic Branch
                    </label>
                    <select
                      value={filters.branch}
                      onChange={(e) => setFilters({ ...filters, branch: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "8px",
                        fontSize: 12,
                        border: "1px solid var(--rule)",
                        borderRadius: 4,
                        background: "var(--paper)",
                        color: "var(--ink)",
                        outline: "none"
                      }}
                    >
                      <option value="all">All Branches</option>
                      {branches.map(branch => (
                        <option key={branch} value={branch}>{branch}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={{ ...mono, fontSize: 10, color: "var(--sub)", letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: 6 }}>
                      Country Location
                    </label>
                    <select
                      value={filters.country}
                      onChange={(e) => setFilters({ ...filters, country: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "8px",
                        fontSize: 12,
                        border: "1px solid var(--rule)",
                        borderRadius: 4,
                        background: "var(--paper)",
                        color: "var(--ink)",
                        outline: "none"
                      }}
                    >
                      {uniqueCountries.map(country => (
                        <option key={country} value={country}>
                          {country === "all" ? "All Countries" : country}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    onClick={() => setFilters({ batch: "all", branch: "all", country: "all" })}
                    style={{
                      padding: "8px 12px",
                      background: "transparent",
                      border: "1px solid var(--rule)",
                      borderRadius: 4,
                      cursor: "pointer",
                      fontSize: 12,
                      color: "var(--sub)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 6,
                      transition: "all 150ms ease"
                    }}
                    onMouseOver={(e) => e.currentTarget.style.borderColor = "var(--blue)"}
                    onMouseOut={(e) => e.currentTarget.style.borderColor = "var(--rule)"}
                  >
                    <RefreshCw size={12} />
                    <span>Reset Filters</span>
                  </button>
                </div>
              )}
            </div>

            {/* Statistics Panel */}
            <div style={{
              background: "var(--surface)",
              border: "1px solid var(--rule)",
              borderRadius: 8,
              padding: 16,
              boxShadow: "0 1px 3px 0 rgba(0,0,0,0.04), 0 1px 2px 0 rgba(0,0,0,0.02)"
            }}>
              <div style={{ ...mono, fontSize: 10, color: "var(--sub)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12, fontWeight: 600 }}>
                Global Impact Stats
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: 8, borderBottom: "1px solid var(--rule)" }}>
                  <span style={{ fontSize: 12, color: "var(--sub)" }}>Alumni Tracked</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>{filteredAlumniCount}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: 8, borderBottom: "1px solid var(--rule)" }}>
                  <span style={{ fontSize: 12, color: "var(--sub)" }}>Active Hub Cities</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>{filteredCities.length}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 12, color: "var(--sub)" }}>Countries Reached</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>
                    {new Set(filteredCities.map(c => c.country)).size}
                  </span>
                </div>
              </div>
            </div>

            {/* Selected Location Details drawer */}
            {selectedCityData && (
              <div style={{
                background: "var(--surface)",
                border: "2px solid var(--blue)",
                borderRadius: 8,
                overflow: "hidden",
                boxShadow: "0 10px 25px rgba(56, 189, 248, 0.15)",
                animation: "slideIn 250ms ease-out"
              }}>
                <div style={{
                  padding: "12px 16px",
                  background: "var(--blue)",
                  color: "#ffffff", // Fixed contrast
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <MapPin size={16} />
                    <span style={{ fontSize: 13, fontWeight: 700 }}>
                      {selectedCityData.city}, {selectedCityData.country}
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedCity(null)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#ffffff", // Fixed contrast
                      cursor: "pointer",
                      padding: 0,
                      display: "flex",
                      alignItems: "center"
                    }}
                  >
                    <X size={16} />
                  </button>
                </div>

                <div style={{ padding: 16 }}>
                  <div style={{ marginBottom: 12, paddingBottom: 12, borderBottom: "1px solid var(--rule)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                      <Users size={14} style={{ color: "var(--blue)" }} />
                      <span style={{ ...mono, fontSize: 11, color: "var(--ink)", fontWeight: 600, textTransform: "uppercase" }}>
                        {selectedCityData.alumni.length} {selectedCityData.alumni.length === 1 ? "Graduate" : "Graduates"}
                      </span>
                    </div>
                  </div>

                  {/* Alumni List */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 10, maxHeight: 320, overflowY: "auto", paddingRight: 4 }}>
                    {selectedCityData.alumni.map(person => (
                      <div 
                        key={person.id} 
                        style={{
                          padding: 12,
                          background: "var(--paper)",
                          borderRadius: 6,
                          fontSize: 12,
                          border: "1px solid var(--rule)",
                          transition: "border-color 150ms ease"
                        }}
                        onMouseOver={(e) => e.currentTarget.style.borderColor = "rgba(56, 189, 248, 0.4)"}
                        onMouseOut={(e) => e.currentTarget.style.borderColor = "var(--rule)"}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                          <span style={{ fontWeight: 600, color: "var(--ink)", fontSize: 13 }}>
                            {person.name}
                          </span>
                          {person.linkedinUrl && (
                            <a
                              href={person.linkedinUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ 
                                color: "var(--blue)", 
                                display: "inline-flex", 
                                alignItems: "center", 
                                textDecoration: "none" 
                              }}
                              title="LinkedIn Profile"
                            >
                              <ExternalLink size={12} />
                            </a>
                          )}
                        </div>
                        <div style={{ fontSize: 11, color: "var(--sub)", marginBottom: 4 }}>
                          {person.currentCompany.position} at <strong style={{ color: "var(--ink)" }}>{person.currentCompany.name}</strong>
                        </div>
                        <div style={{ ...mono, fontSize: 10, color: "var(--sub)", display: "flex", justifyContent: "space-between" }}>
                          <span>{person.branch.split(" ")[0]}</span>
                          <span>Class of {person.endYear}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
