import { useState, useMemo } from "react";
import { alumni, branches } from "../data/mockData";
import { getCoordinates } from "../data/geodata";
import { serif, mono } from "../theme";
import { X, Globe, Filter, MapPin, Users } from "lucide-react";

export default function GlobePage() {
  const [selectedCity, setSelectedCity] = useState(null);
  const [filters, setFilters] = useState({
    batch: "all",
    branch: "all",
    country: "all",
  });
  const [showFilters, setShowFilters] = useState(false);

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

  // Get unique batches, countries for filters
  const uniqueBatches = ["all", ...new Set(alumni.map(a => `${a.startYear}-${a.endYear}`))];
  const uniqueCountries = ["all", ...new Set(alumni.map(a => a.currentCountry))];

  // SVG projection (simple Mercator-like)
  const projectPoint = (lat, lng) => {
    const x = ((lng + 180) / 360) * 1000;
    const y = ((90 - lat) / 180) * 600;
    return { x, y };
  };

  // Get max alumni count for scaling
  const maxAlumni = Math.max(...filteredCities.map(c => c.alumni.length), 1);

  return (
    <div style={{ background: "var(--paper)", minHeight: "100vh" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "32px 24px" }}>

        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <Globe style={{ width: 28, height: 28, color: "var(--blue)" }} />
            <h1 style={{ ...serif, fontSize: 28, fontWeight: 600, color: "var(--ink)", margin: 0, letterSpacing: "-0.02em" }}>
              Global Alumni Network
            </h1>
          </div>
          <p style={{ fontSize: 14, color: "var(--sub)", margin: 0 }}>
            Discover where IIT Guwahati alumni are making an impact worldwide
          </p>
        </div>

        {/* Main Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 24 }}>

          {/* Globe/Map Section */}
          <div style={{
            background: "var(--surface)",
            border: "1px solid var(--rule)",
            borderRadius: 6,
            padding: 24,
            position: "relative",
          }}>
            {/* SVG Globe */}
            <svg
              viewBox="0 0 1000 600"
              style={{
                width: "100%",
                height: "auto",
                background: "linear-gradient(180deg, #E8F1F8 0%, #F8F7F4 100%)",
                borderRadius: 4,
                border: "1px solid var(--rule)",
              }}
            >
              {/* Simplified world map background */}
              <defs>
                <pattern id="gridPattern" width="50" height="50" patternUnits="userSpaceOnUse">
                  <path d="M 50 0 L 0 0 0 50" fill="none" stroke="var(--rule)" strokeWidth="0.5" opacity="0.3" />
                </pattern>
              </defs>

              {/* Grid background */}
              <rect width="1000" height="600" fill="url(#gridPattern)" />

              {/* Equator and Prime Meridian */}
              <line x1="0" y1="300" x2="1000" y2="300" stroke="var(--rule)" strokeWidth="1" opacity="0.2" />
              <line x1="500" y1="0" x2="500" y2="600" stroke="var(--rule)" strokeWidth="1" opacity="0.2" />

              {/* Alumni markers */}
              {filteredCities.map(cityData => {
                const { x, y } = projectPoint(cityData.coords.lat, cityData.coords.lng);
                const radius = Math.max(8, Math.min(30, (cityData.alumni.length / maxAlumni) * 25 + 8));
                const isSelected = selectedCity === `${cityData.city}|${cityData.country}`;

                return (
                  <g
                    key={`${cityData.city}|${cityData.country}`}
                    style={{ cursor: "pointer" }}
                    onClick={() => setSelectedCity(`${cityData.city}|${cityData.country}`)}
                  >
                    {/* Outer circle (glow effect) */}
                    <circle
                      cx={x}
                      cy={y}
                      r={radius + 4}
                      fill="var(--blue)"
                      opacity={isSelected ? 0.3 : 0.1}
                      style={{ transition: "all 200ms ease" }}
                    />

                    {/* Main marker */}
                    <circle
                      cx={x}
                      cy={y}
                      r={radius}
                      fill={isSelected ? "var(--blue)" : "var(--amber)"}
                      stroke="var(--surface)"
                      strokeWidth="2"
                      style={{ transition: "all 200ms ease" }}
                    />

                    {/* Alumni count text */}
                    {radius > 12 && (
                      <text
                        x={x}
                        y={y}
                        textAnchor="middle"
                        dy="0.3em"
                        fill="white"
                        fontSize="12"
                        fontWeight="600"
                        fontFamily="IBM Plex Mono, monospace"
                        pointerEvents="none"
                      >
                        {cityData.alumni.length}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Legend */}
            <div style={{
              marginTop: 16,
              display: "flex",
              gap: 24,
              fontSize: 12,
              color: "var(--sub)",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  background: "var(--amber)",
                  border: "1px solid var(--surface)",
                }} />
                <span>Alumni location</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  background: "var(--blue)",
                  border: "1px solid var(--surface)",
                }} />
                <span>Selected location</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 10, color: "var(--sub)" }}>Circle size = Alumni count</span>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            {/* Filters */}
            <div style={{
              background: "var(--surface)",
              border: "1px solid var(--rule)",
              borderRadius: 6,
              padding: 16,
            }}>
              <button
                onClick={() => setShowFilters(!showFilters)}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "10px 12px",
                  background: showFilters ? "var(--paper)" : "transparent",
                  border: "1px solid var(--rule)",
                  borderRadius: 4,
                  cursor: "pointer",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "var(--ink)",
                  marginBottom: showFilters ? 12 : 0,
                }}
              >
                <Filter size={14} /> Filters
              </button>

              {showFilters && (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <div>
                    <label style={{ ...mono, fontSize: 10, color: "var(--sub)", letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: 6 }}>
                      Batch
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
                        background: "var(--surface)",
                        color: "var(--ink)",
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
                      Branch
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
                        background: "var(--surface)",
                        color: "var(--ink)",
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
                      Country
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
                        background: "var(--surface)",
                        color: "var(--ink)",
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
                    }}
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>

            {/* Stats */}
            <div style={{
              background: "var(--surface)",
              border: "1px solid var(--rule)",
              borderRadius: 6,
              padding: 16,
            }}>
              <div style={{ ...mono, fontSize: 10, color: "var(--sub)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12, fontWeight: 600 }}>
                Network Stats
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: 8, borderBottom: "1px solid var(--rule)" }}>
                  <span style={{ fontSize: 12, color: "var(--sub)" }}>Total Alumni</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>{alumni.length}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: 8, borderBottom: "1px solid var(--rule)" }}>
                  <span style={{ fontSize: 12, color: "var(--sub)" }}>Locations</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>{filteredCities.length}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 12, color: "var(--sub)" }}>Countries</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>
                    {new Set(filteredCities.map(c => c.country)).size}
                  </span>
                </div>
              </div>
            </div>

            {/* Selected City Details */}
            {selectedCityData && (
              <div style={{
                background: "var(--surface)",
                border: "2px solid var(--blue)",
                borderRadius: 6,
                overflow: "hidden",
              }}>
                <div style={{
                  padding: "12px 16px",
                  background: "var(--blue)",
                  color: "#fff",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <MapPin size={16} />
                    <span style={{ fontSize: 13, fontWeight: 600 }}>
                      {selectedCityData.city}, {selectedCityData.country}
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedCity(null)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#fff",
                      cursor: "pointer",
                      padding: 0,
                    }}
                  >
                    <X size={16} />
                  </button>
                </div>

                <div style={{ padding: 16 }}>
                  <div style={{ marginBottom: 12, paddingBottom: 12, borderBottom: "1px solid var(--rule)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                      <Users size={14} style={{ color: "var(--blue)" }} />
                      <span style={{ ...mono, fontSize: 11, color: "var(--sub)", fontWeight: 600, textTransform: "uppercase" }}>
                        {selectedCityData.alumni.length} Alumni
                      </span>
                    </div>
                  </div>

                  {/* Alumni List */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: 400, overflowY: "auto" }}>
                    {selectedCityData.alumni.map(person => (
                      <div key={person.id} style={{
                        padding: 10,
                        background: "var(--paper)",
                        borderRadius: 4,
                        fontSize: 12,
                      }}>
                        <div style={{ fontWeight: 600, color: "var(--ink)", marginBottom: 2 }}>
                          {person.name}
                        </div>
                        <div style={{ fontSize: 11, color: "var(--sub)", marginBottom: 2 }}>
                          {person.currentCompany.position}
                        </div>
                        <div style={{ ...mono, fontSize: 10, color: "var(--sub)" }}>
                          {person.branch.split(" ")[0]} · {person.startYear}–{person.endYear}
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
