// data.js

const SCENARIO_TEXT = "The year is 2028. Following a tumultuous four years, the American electorate is more divided than ever. New faces have emerged from the governors' mansions and the halls of Congress, ready to challenge for the highest office. The map is shifting. Will the Rust Belt hold? Will Texas flip? The world is watching.";

const PARTIES = {
    D: { name: "Democratic Party", color: "#00AEF3", chair: "Jaime Harrison", chair_img: "https://via.placeholder.com/100?text=Chair", desc: "The oldest active political party in the world, emphasizing social equality and environmental protection." },
    R: { name: "Republican Party", color: "#E81B23", chair: "Michael Whatley", chair_img: "https://via.placeholder.com/100?text=Chair", desc: " The GOP (Grand Old Party) advocates for traditional values, low taxes, and free-market capitalism." },
    I: { name: "Independent / Third Party", color: "#F2C75C", chair: "N/A", chair_img: "https://via.placeholder.com/100?text=N/A", desc: "Challenging the duopoly with fresh ideas and non-partisan solutions." }
};

// Candidates Database
// Note: We use 'img' placeholders. You will replace these URLs with real images later.
const CANDIDATES = [
    // DEMOCRATS
    { id: "newsom", name: "Gavin Newsom", party: "D", home: "CA", desc: "The slick California Governor known for aggressive media tactics.", img: "https://via.placeholder.com/150?text=Newsom" },
    { id: "aoc", name: "Alexandria Ocasio-Cortez", party: "D", home: "NY", desc: "The progressive firebrand rallying the youth vote.", img: "https://via.placeholder.com/150?text=AOC" },
    { id: "harris", name: "Kamala Harris", party: "D", home: "CA", desc: "The former VP seeking to reclaim the White House.", img: "https://via.placeholder.com/150?text=Harris" },
    { id: "buttigieg", name: "Pete Buttigieg", party: "D", home: "MI", desc: "The eloquent communicator with strong Midwestern appeal.", img: "https://via.placeholder.com/150?text=Pete" },
    { id: "beshear", name: "Andy Beshear", party: "D", home: "KY", desc: "A popular red-state Democrat focusing on unity.", img: "https://via.placeholder.com/150?text=Beshear" },
    { id: "shapiro", name: "Josh Shapiro", party: "D", home: "PA", desc: "The Governor of the critical swing state of Pennsylvania.", img: "https://via.placeholder.com/150?text=Shapiro" },
    
    // REPUBLICANS
    { id: "vance", name: "JD Vance", party: "R", home: "OH", desc: "The current torchbearer of the MAGA movement.", img: "https://via.placeholder.com/150?text=Vance" },
    { id: "desantis", name: "Ron DeSantis", party: "R", home: "FL", desc: "Fighting the culture war from the Sunshine State.", img: "https://via.placeholder.com/150?text=DeSantis" },
    { id: "haley", name: "Nikki Haley", party: "R", home: "SC", desc: "A traditional conservative with foreign policy chops.", img: "https://via.placeholder.com/150?text=Haley" },
    
    // INDEPENDENT
    { id: "yang", name: "Andrew Yang", party: "I", home: "NY", desc: "Forward Party founder focused on automation and UBI.", img: "https://via.placeholder.com/150?text=Yang" }
];

// Initial State Data (Wikipedia Color Scheme Defaults)
// You would eventually load a CSV here, but this object acts as our "CSV" for now.
const INITIAL_MAP_DATA = {
    "CA": { ev: 54, lean: "D", margin: 20 },
    "TX": { ev: 40, lean: "R", margin: 10 },
    "FL": { ev: 30, lean: "R", margin: 8 },
    "NY": { ev: 28, lean: "D", margin: 25 },
    "PA": { ev: 19, lean: "D", margin: 1 }, // Swing
    "IL": { ev: 19, lean: "D", margin: 15 },
    "OH": { ev: 17, lean: "R", margin: 8 },
    "GA": { ev: 16, lean: "R", margin: 2 }, // Swing
    "NC": { ev: 16, lean: "R", margin: 3 }, // Swing
    "MI": { ev: 15, lean: "D", margin: 2 }, // Swing
    // ... add all states ...
};
