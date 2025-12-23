const SCENARIO_TEXT = "The year is 2028. The nation is at a crossroads. Following a tumultuous decade, the electorate is fractured. The Rust Belt is trending right, the Sun Belt is trending left, and new coalitions are forming. You must navigate the primaries, select a VP to balance your ticket, and manage your resources to win 270 Electoral Votes.";

const PARTIES = {
    D: { name: "Democratic Party", color: "#00AEF3", chair: "Jaime Harrison", chair_img: "images/dem_chair.jpg", desc: "Platform: Climate Action, Healthcare Expansion, Social Equality." },
    R: { name: "Republican Party", color: "#E81B23", chair: "Michael Whatley", chair_img: "images/gop_chair.jpg", desc: "Platform: Border Security, Economic Deregulation, Traditional Values." },
    I: { name: "Independent", color: "#F2C75C", chair: "N/A", chair_img: "images/scenario.jpg", desc: "Platform: Electoral Reform, Anti-Corruption, Centrist Solutions." }
};

const CANDIDATES = [
    { id: "newsom", name: "Gavin Newsom", party: "D", home: "CA", desc: "Governor of California.", buff: "Fundraising Machine (Cash x1.2)", img: "images/newsom.jpg" },
    { id: "harris", name: "Kamala Harris", party: "D", home: "CA", desc: "Former Vice President.", buff: "Base Turnout (+Safe D States)", img: "images/harris.jpg" },
    { id: "whitmer", name: "Gretchen Whitmer", party: "D", home: "MI", desc: "Governor of Michigan.", buff: "Rust Belt Appeal (+MI/WI/PA)", img: "images/whitmer.jpg" },
    { id: "shapiro", name: "Josh Shapiro", party: "D", home: "PA", desc: "Popular PA Governor.", buff: "Swing State King (+PA)", img: "images/shapiro.jpg" },
    { id: "buttigieg", name: "Pete Buttigieg", party: "D", home: "MI", desc: "Transportation Secretary.", buff: "Media Darling (+Global Polls)", img: "images/buttigieg.jpg" },
    
    { id: "vance", name: "JD Vance", party: "R", home: "OH", desc: "The populist standard-bearer.", buff: "Rust Belt Appeal (+OH/PA)", img: "images/vance.jpg" },
    { id: "desantis", name: "Ron DeSantis", party: "R", home: "FL", desc: "Governor of Florida.", buff: "Culture Warrior (+FL/TX)", img: "images/desantis.jpg" },
    { id: "haley", name: "Nikki Haley", party: "R", home: "SC", desc: "Former UN Ambassador.", buff: "Suburban Appeal (+VA/CO)", img: "images/haley.jpg" },
    { id: "ramaswamy", name: "Vivek Ramaswamy", party: "R", home: "OH", desc: "Tech Entrepreneur.", buff: "Self-Funder (Start with $5M)", img: "images/vance.jpg" },
    
    { id: "yang", name: "Andrew Yang", party: "I", home: "NY", desc: "Forward Party Founder.", buff: "UBI Appeal (+Youth Vote)", img: "images/yang.jpg" }
];

const STATE_DATA = {
    "AL": { name: "Alabama", ev: 9, polling: 35 }, "AK": { name: "Alaska", ev: 3, polling: 42 }, "AZ": { name: "Arizona", ev: 11, polling: 49 },
    "AR": { name: "Arkansas", ev: 6, polling: 35 }, "CA": { name: "California", ev: 54, polling: 65 }, "CO": { name: "Colorado", ev: 10, polling: 56 },
    "CT": { name: "Connecticut", ev: 7, polling: 59 }, "DE": { name: "Delaware", ev: 3, polling: 60 }, "DC": { name: "District of Columbia", ev: 3, polling: 90 },
    "FL": { name: "Florida", ev: 30, polling: 45 }, "GA": { name: "Georgia", ev: 16, polling: 48 }, "HI": { name: "Hawaii", ev: 4, polling: 68 },
    "ID": { name: "Idaho", ev: 4, polling: 30 }, "IL": { name: "Illinois", ev: 19, polling: 57 }, "IN": { name: "Indiana", ev: 11, polling: 40 },
    "IA": { name: "Iowa", ev: 6, polling: 43 }, "KS": { name: "Kansas", ev: 6, polling: 40 }, "KY": { name: "Kentucky", ev: 8, polling: 35 },
    "LA": { name: "Louisiana", ev: 8, polling: 38 }, "ME": { name: "Maine", ev: 4, polling: 55 }, "MD": { name: "Maryland", ev: 10, polling: 63 },
    "MA": { name: "Massachusetts", ev: 11, polling: 65 }, "MI": { name: "Michigan", ev: 15, polling: 51 }, "MN": { name: "Minnesota", ev: 10, polling: 53 },
    "MS": { name: "Mississippi", ev: 6, polling: 38 }, "MO": { name: "Missouri", ev: 10, polling: 41 }, "MT": { name: "Montana", ev: 4, polling: 40 },
    "NE": { name: "Nebraska", ev: 5, polling: 38 }, "NV": { name: "Nevada", ev: 6, polling: 50 }, "NH": { name: "New Hampshire", ev: 4, polling: 52 },
    "NJ": { name: "New Jersey", ev: 14, polling: 58 }, "NM": { name: "New Mexico", ev: 5, polling: 54 }, "NY": { name: "New York", ev: 28, polling: 60 },
    "NC": { name: "North Carolina", ev: 16, polling: 48 }, "ND": { name: "North Dakota", ev: 3, polling: 30 }, "OH": { name: "Ohio", ev: 17, polling: 45 },
    "OK": { name: "Oklahoma", ev: 7, polling: 32 }, "OR": { name: "Oregon", ev: 8, polling: 58 }, "PA": { name: "Pennsylvania", ev: 19, polling: 50 },
    "RI": { name: "Rhode Island", ev: 4, polling: 60 }, "SC": { name: "South Carolina", ev: 9, polling: 42 }, "SD": { name: "South Dakota", ev: 3, polling: 35 },
    "TN": { name: "Tennessee", ev: 11, polling: 37 }, "TX": { name: "Texas", ev: 40, polling: 43 }, "UT": { name: "Utah", ev: 6, polling: 38 },
    "VT": { name: "Vermont", ev: 3, polling: 65 }, "VA": { name: "Virginia", ev: 13, polling: 54 }, "WA": { name: "Washington", ev: 12, polling: 60 },
    "WV": { name: "West Virginia", ev: 4, polling: 28 }, "WI": { name: "Wisconsin", ev: 10, polling: 50 }, "WY": { name: "Wyoming", ev: 3, polling: 25 }
};
