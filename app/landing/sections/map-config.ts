/**
 * Legacy US interstate demo map data (unused on the Ethiopian landing).
 * Coordinates for `USInterstateMap` scaffolding only.
 */

export interface LogisticsHub {
  id: string;
  city: string;
  state: string;
  lat: number;
  lng: number;
  status: "Active" | "High Volume" | "Moderate" | "Low";
  activeLoads: number;
  weatherDelay: number; // minutes
  truckCount: number;
  corridor: string;
}

export interface InterstateRoute {
  id: string;
  label: string;
  shield: number | string;
  shieldType: "interstate" | "us-route";
  volume: string;
  efficiency: string;
  // Key waypoints defining the route (lat, lng pairs)
  waypoints: [number, number][];
  // Shield position along the route (0-1)
  shieldPosition: number;
}

// USA Logistics Hubs with real-world coordinates - Source of Truth
export const LOGISTICS_HUBS: Record<string, LogisticsHub> = {
  SEA: {
    id: "SEA",
    city: "Seattle",
    state: "WA",
    lat: 47.606,
    lng: -122.332,
    status: "Active",
    activeLoads: 312,
    weatherDelay: 0,
    truckCount: 5,
    corridor: "I-5 / I-90",
  },
  LAX: {
    id: "LAX",
    city: "Los Angeles",
    state: "CA",
    lat: 34.052,
    lng: -118.243,
    status: "Active",
    activeLoads: 567,
    weatherDelay: 0,
    truckCount: 9,
    corridor: "I-10 / I-5",
  },
  ORD: {
    id: "ORD",
    city: "Chicago",
    state: "IL",
    lat: 41.878,
    lng: -87.629,
    status: "High Volume",
    activeLoads: 892,
    weatherDelay: 15,
    truckCount: 12,
    corridor: "I-80 / I-90",
  },
  LRD: {
    id: "LRD",
    city: "Laredo",
    state: "TX",
    lat: 27.503,
    lng: -99.507,
    status: "High Volume",
    activeLoads: 342,
    weatherDelay: 0,
    truckCount: 8,
    corridor: "I-35 (Border)",
  },
  MIA: {
    id: "MIA",
    city: "Miami",
    state: "FL",
    lat: 25.761,
    lng: -80.191,
    status: "Active",
    activeLoads: 428,
    weatherDelay: 10,
    truckCount: 6,
    corridor: "I-95",
  },
  JFK: {
    id: "JFK",
    city: "New York",
    state: "NY",
    lat: 40.712,
    lng: -74.006,
    status: "High Volume",
    activeLoads: 743,
    weatherDelay: 25,
    truckCount: 10,
    corridor: "I-95 / I-80",
  },
};

// Interstate Routes with key waypoints for realistic path drawing
export const INTERSTATE_ROUTES: InterstateRoute[] = [
  {
    id: "I-80",
    label: "Transcontinental",
    shield: 80,
    shieldType: "interstate",
    volume: "48K loads/day",
    efficiency: "94%",
    waypoints: [
      [37.7749, -122.4194], // SF
      [39.5296, -119.8145], // Reno
      [40.7608, -111.8910], // Salt Lake
      [41.2524, -95.9980], // Omaha
      [41.8781, -87.6298], // Chicago
      [41.5868, -87.3360], // Gary
      [41.0814, -81.5190], // Akron
      [40.7589, -73.9851], // NYC area
    ],
    shieldPosition: 0.55,
  },
  {
    id: "I-95",
    label: "Eastern Seaboard",
    shield: 95,
    shieldType: "interstate",
    volume: "62K loads/day",
    efficiency: "91%",
    waypoints: [
      [25.7617, -80.1918], // Miami
      [27.9506, -82.4572], // Tampa
      [32.0835, -81.0998], // Savannah
      [33.7490, -84.3880], // Atlanta
      [35.7796, -78.6382], // Raleigh
      [38.9072, -77.0369], // DC
      [40.7589, -73.9851], // NYC
      [42.3601, -71.0589], // Boston
    ],
    shieldPosition: 0.6,
  },
  {
    id: "I-10",
    label: "Southern Tier",
    shield: 10,
    shieldType: "interstate",
    volume: "55K loads/day",
    efficiency: "93%",
    waypoints: [
      [34.0522, -118.2437], // LA
      [33.4484, -112.0740], // Phoenix
      [32.7767, -96.7970], // Dallas
      [29.7604, -95.3698], // Houston
      [30.3322, -81.6557], // Jacksonville
    ],
    shieldPosition: 0.5,
  },
  {
    id: "I-35",
    label: "Central Corridor",
    shield: 35,
    shieldType: "interstate",
    volume: "38K loads/day",
    efficiency: "89%",
    waypoints: [
      [27.5306, -99.4803], // Laredo
      [29.4241, -98.4936], // San Antonio
      [30.2672, -97.7431], // Austin
      [32.7767, -96.7970], // Dallas
      [35.4676, -97.5164], // OKC
      [41.5868, -93.6250], // Des Moines
      [44.9778, -93.2650], // Minneapolis
    ],
    shieldPosition: 0.45,
  },
  {
    id: "US-66",
    label: "Heritage Corridor",
    shield: 66,
    shieldType: "us-route",
    volume: "12K loads/day",
    efficiency: "87%",
    waypoints: [
      [41.8781, -87.6298], // Chicago
      [39.0997, -94.5786], // KC
      [35.4676, -97.5164], // OKC
      [35.2220, -101.8313], // Amarillo
      [35.0844, -106.6504], // Albuquerque
      [34.0522, -118.2437], // LA
    ],
    shieldPosition: 0.5,
  },
];

// Transit assets - trucks moving between specific hubs
export interface TransitAsset {
  id: string;
  routeId: string;
  direction: "forward" | "reverse";
  speed: number; // seconds to complete route
  delay: number; // initial delay
}

export const TRANSIT_ASSETS: TransitAsset[] = [
  { id: "TA-001", routeId: "I-35", direction: "forward", speed: 20, delay: 0 },
  { id: "TA-002", routeId: "I-35", direction: "reverse", speed: 25, delay: 8 },
  { id: "TA-003", routeId: "I-80", direction: "forward", speed: 30, delay: 3 },
  { id: "TA-004", routeId: "I-80", direction: "reverse", speed: 28, delay: 12 },
  { id: "TA-005", routeId: "I-10", direction: "forward", speed: 22, delay: 6 },
  { id: "TA-006", routeId: "I-95", direction: "forward", speed: 18, delay: 2 },
];
