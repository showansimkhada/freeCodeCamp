/*
Build a Playlist Remix Engine
In this lab, you will build a program that creates a single remix playlist from multiple playlists submitted by listeners.

Each listener provides a list of songs they want to hear. Some songs may appear more than once, and some artists may show up too many times. Your job is to work through these playlists step by step: combine them into one list, score each song, remove duplicate songs, limit how often the same artist appears, and then create a final play order.

Objective: Fulfill the user stories below and get all the tests to pass to complete the lab.

User Stories:

You should create a function named flattenPlaylists that accepts an array of playlists where each playlist is an array of objects with the following properties: trackId, artist, title, votes, bpm. If the input is not an array, flattenPlaylists should return an empty array. An example playlist has been provided for you. You can use this example to test out your function.
flattenPlaylists should return a flat array of track objects, where each object includes all the original track properties plus a source property set to an array with the playlist index and the track index indicating where the track originated.
You should create a function named scoreTracks that accepts an array of track objects as returned by flattenPlaylists (each with trackId, artist, title, votes, bpm, and source properties) and returns a new array of track objects, each with a score property added using the formula: votes * 10 - Math.abs(bpm - 120).
You should create a function named dedupeTracks that accepts an array of track objects as returned by scoreTracks and returns a new array with duplicate trackId entries removed, keeping only the first occurrence of each.
You should create a function named enforceArtistQuota that accepts an array of track objects as returned by dedupeTracks and a number representing the maximum allowed occurrences per artist. The function should return a new array where no artist appears more times than the given number, keeping the earliest occurrences.
You should create a function named buildSchedule that accepts an array of track objects as returned by enforceArtistQuota and returns a new array of { slot, trackId } objects, where slot is a 1-based index representing each track's position in the broadcast order.
You should create a function named remixPlaylist that accepts an array of playlists and the maximum number of allowed occurrences per artist. The function should return the final broadcast schedule as an array of { slot, trackId } objects, by calling flattenPlaylists, scoreTracks, dedupeTracks, enforceArtistQuota, and buildSchedule in order.
Tests:

Passed: 1. You should have a function named flattenPlaylists.
Passed: 2. You should return an empty array from flattenPlaylists when the input is not an array.
Passed: 3. Each track returned by flattenPlaylists should include a source field that is an array containing the playlist index and the track index.
Passed: 4. You should have a function named scoreTracks.
Passed: 5. Each track returned by scoreTracks should include a numeric score field.
Passed: 6. You should calculate score using a target BPM of 120 and this formula: votes * 10 - Math.abs(bpm - 120).
Passed: 7. You should have a function named dedupeTracks.
Passed: 8. When duplicate trackId values exist, dedupeTracks should keep only the first occurrence of the track.
Passed: 9. You should have a function named enforceArtistQuota.
Passed: 10. enforceArtistQuota should ensure no artist appears more than maxPerArtist times by removing extra tracks while keeping the earliest ones.
Passed: 11. You should have a function named buildSchedule.
Passed: 12. buildSchedule should return an array of objects with the shape { slot, trackId }, where slot starts at 1.
Passed: 13. You should have a function named remixPlaylist.
Passed: 14. remixPlaylist should call the helper functions in order to produce the final schedule.
*/

const playlists = [
  [
    {
      trackId: "trk101",
      artist: "Velvet Comet",
      title: "Crimson Afterglow",
      votes: 5,
      bpm: 122
    },
    {
      trackId: "trk101",
      artist: "Velvet Comet",
      title: "Crimson Afterglow",
      votes: 5,
      bpm: 122
    },
    {
      trackId: "trk102",
      artist: "Neon Harbor",
      title: "Static Horizon",
      votes: 2,
      bpm: 108
    },
    {
      trackId: "trk103",
      artist: "Lunar Arcade",
      title: "Midnight Frequency",
      votes: 4,
      bpm: 128
    }
  ],
  [
    {
      trackId: "trk201",
      artist: "Solar Echo",
      title: "Glass Skyline",
      votes: 3,
      bpm: 115
    },
    {
      trackId: "trk202",
      artist: "Velvet Comet",
      title: "Satellite Hearts",
      votes: 6,
      bpm: 124
    }
  ]
];

function flattenPlaylists(arr) {
  let result = [];
  if (!Array.isArray(arr)) {
    return result;
  } else {
    const n = arr.length;
    for (let i = 0; i < n; i++) {
      let m = arr[i].length;
      for (let j = 0; j < m; j++) {
        arr[i][j].source = [i, j]
        result.push(arr[i][j])
      }
    }
    return result;
  }
}

function scoreTracks(arr) {
  let copyArr = [...arr];
  const n = copyArr.length;
  for (let i = 0; i < n; i++) {
    const score = copyArr[i].votes * 10 - Math.abs(copyArr[i].bpm - 120);
    copyArr[i].score = score;
  }
  return copyArr
}

function dedupeTracks(arr) {
  let copyArr = [];
  let n = arr.length;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n - 1; j++) {
      if (copyArr.length === 0) {
        copyArr.push(arr[i])
      }
      if (arr[i].trackId !== arr[j].trackId) {
        copyArr.push(arr[j])
      }
    }
  }
  return copyArr;
}

function enforceArtistQuota(arr, maxPerArtist) {
  let result = []
  let count = 0;
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n - 1; j++) {
      if (result.length === 0) {
        result.push(arr[i])
      }
      if (arr[i].artist === arr[j].artist) {
        count++;
        if (count > maxPerArtist) {
          break
        }
        result.push(arr[j])
      }
    }
  }
  return result;
}

function buildSchedule(arr) {
  let n = arr.length;
  let result = [];
  for (let i = 0; i < n; i++) {
    result.push({slot: i+1, trackId: arr[i].trackId})
  }
  return result;
}

function remixPlaylist(arr, maxArtist) {
  const flattenPlaylist = flattenPlaylists(arr);
  const scoreTrack = scoreTracks(flattenPlaylist);
  const dedupeTrack = dedupeTracks(scoreTrack);
  const enforceArtistQuotas = enforceArtistQuota(dedupeTrack, maxArtist);
  const buildSchedules = buildSchedule(enforceArtistQuotas)
  return buildSchedules;
}