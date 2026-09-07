/*
Build a Cargo Manifest Validator
In this lab, you will use JavaScript to normalize and validate cargo manifests. A cargo manifest is a document that typically lists goods being transported (for example, by ship or train) and includes details about those goods.

Each cargo manifest will be represented as an object with the following properties:

containerId: a positive integer identifying the associated cargo container.
destination: a non-empty string (after trimming whitespace) denoting the cargo's target destination.
weight: a positive number representing the cargo's weight.
unit: a string describing the unit of the cargo's weight property (either "kg" for kilograms or "lb" for pounds).
hazmat: a boolean value indicating whether hazardous material handling is needed.
Example cargo manifest object:

{
  containerId: 1,
  destination: "Monterey, California, USA",
  weight: 831,
  unit: "lb",
  hazmat: false
}
Objective: Fulfill the user stories below and get all the tests to pass to complete the lab.

User Stories:

You should implement a function named normalizeUnits with a manifest parameter.

The function must not mutate the original manifest object and must always return a new object where weight is normalized to kilograms and unit is set to "kg".
If the weight of the manifest object is expressed in pounds (unit: "lb"), the function should convert the weight to kilograms using the approximate conversion 1 lb = 0.45 kg, and update the unit accordingly.
If the weight is already expressed in kilograms (unit: "kg"), the weight and unit should remain unchanged.
You should implement a function named validateManifest with a manifest parameter.

The function must not mutate the original manifest object and must always return a new object.
If the input manifest is valid (no missing or invalid properties), the function should return an empty object.
If the input manifest is not valid, the function should return an object containing entries for each missing or invalid property. Missing properties should have the value "Missing" and invalid properties should have the value "Invalid".
Example return value where the input object is missing the destination property and has an invalid weight property:

{
  destination: "Missing",
  weight: "Invalid"
}
You should implement a function named processManifest with a manifest parameter. The function should log:

If the manifest object is valid, Validation success: ${containerId} and then the manifest's weight in kilograms, in the form Total weight: ${weight} kg. Use normalizeUnits() for this conversion.
If the manifest object is not valid, Validation error: ${containerId} and then the object returned by calling validateManifest() with the manifest object.
Note: Each of these two cases should have two console.log() calls.
Note: Do not declare normalizeUnits, validateManifest, or processManifest using const, since the tests need to reassign them.
Tests:

Passed: 1. You should not declare normalizeUnits, validateManifest, or processManifest using const, since the tests need to reassign them.
Passed: 2. You should have a function named normalizeUnits with a manifest parameter.
Passed: 3. Your normalizeUnits function should return the new object { containerId: 68, destination: "Salinas", weight: 45.45, unit: "kg", hazmat: true } when called with { containerId: 68, destination: "Salinas", weight: 101, unit: "lb", hazmat: true }, without mutating the original.
Passed: 4. Your normalizeUnits function should return a copy of the input manifest object with its weight normalized to kilograms and its unit set to "kg". Use the approximate conversion 1 lb = 0.45 kg for the weight conversion.
Passed: 5. Your normalizeUnits function should return a new copy of the input manifest object without mutating the original.
Passed: 6. You should have a function named validateManifest with a manifest parameter.
Passed: 7. Your validateManifest function should return a new, empty object {} when called with { containerId: 1, destination: "Santa Cruz", weight: 304, unit: "kg", hazmat: false }.
Passed: 8. Your validateManifest function should return an empty object {} if the input manifest object is valid.
Passed: 9. Your validateManifest function should return the new object { containerId: "Missing", destination: "Missing", weight: "Missing", unit: "Missing", hazmat: "Missing" } when called with {}, without mutating the original.
Passed: 10. Your validateManifest function should return the new object { containerId: "Invalid" } when called with { containerId: null, destination: "Santa Cruz", weight: 304, unit: "kg", hazmat: false }, without mutating the original.
Passed: 11. Your validateManifest function should return the new object { containerId: "Invalid", destination: "Invalid", weight: "Invalid", unit: "Invalid", hazmat: "Invalid" } when called with { containerId: 0, destination: 405, weight: -84, unit: "pounds", hazmat: "no" }, without mutating the original.
Passed: 12. Your validateManifest function should return the new object { containerId: "Invalid", destination: "Missing", weight: "Missing", unit: "Missing", hazmat: "Missing" } when called with { containerId: -2 }, without mutating the original.
Passed: 13. Your validateManifest function should return the new object { containerId: "Invalid", destination: "Missing", weight: "Missing", unit: "Missing", hazmat: "Missing" } when called with { containerId: 3.50 }, without mutating the original. You can use Number.isInteger() to validate integer values.
Passed: 14. Your validateManifest function should return the new object { containerId: "Missing", destination: "Invalid", weight: "Missing", unit: "Missing", hazmat: "Missing" } when called with { destination: "  " }, without mutating the original. You can use .trim() to remove whitespace from a string.
Passed: 15. Your validateManifest function should return the new object { containerId: "Missing", destination: "Missing", weight: "Invalid", unit: "Missing", hazmat: "Missing" } when called with { weight: NaN }, without mutating the original. You can use Number.isNaN() to validate NaN values.
Passed: 16. Your validateManifest function should return an object describing missing and/or invalid properties if the input manifest object is not valid.
Passed: 17. Your validateManifest function should return a new object without mutating the original.
Passed: 18. You should have a function named processManifest with a manifest parameter.
Passed: 19. Your processManifest function should first log Validation success: 55 and then log Total weight: 180 kg when called with { containerId: 55, destination: "Carmel", weight: 400, unit: "lb", hazmat: false }.
Passed: 20. Your processManifest function should first log the success message, Validation success: ${containerId}, if the input manifest object is valid.
Passed: 21. Your processManifest function should normalize a valid input manifest object to kilograms using normalizeUnits() and then log Total weight: ${weight} kg.
Passed: 22. Your processManifest function should log a success message with the object's containerId, and then log the object's weight in kilograms, if the input manifest object is valid. You should use normalizeUnits() for the conversion, and this should involve two console.log() calls.
Passed: 23. Your processManifest function should first log Validation error: -88 and then log the object { containerId: "Invalid", weight: "Invalid", unit: "Missing", hazmat: "Missing" } when called with { containerId: -88, destination: "Soledad", weight: NaN }.
Passed: 24. Your processManifest function should first log Validation error: undefined and then log the object { containerId: "Missing", weight: "Missing", unit: "Missing" } when called with { destination: "Watsonville", hazmat: true }.
Passed: 25. Your processManifest function should first log the error message, Validation error: ${containerId}, if the input manifest object is not valid.
Passed: 26. Your processManifest function should also log the object returned by calling validateManifest() with the original manifest object if the input manifest object is not valid. Call console.log() directly with the returned object.
Passed: 27. Your processManifest function should log an error message with the object's containerId, and then log the object returned by calling validateManifest() with the input object, if the input manifest object is not valid. This should involve two console.log() calls.
*/

const cargo = {
  containerId: 68, 
  destination: "Salinas", 
  weight: 101,
  unit: "lb",
  hazmat: true
}

const properties = ['containerId', 'destination', 'weight', 'unit', 'hazmat']

const rules = {
  containerId: (val) => typeof val == "number" && val > 0 && Number.isInteger(val),
  destination: (val) => typeof val == "string" && val.trim().length > 1,
  weight: (val) => typeof val == "number" && val > 0,
  unit: (val) => typeof val == "string" && (val == "kg" || val == "lb"),
  hazmat: (val) => typeof val == "boolean"
}

const getContainerId = (manifest) => {
  return manifest.containerId
}

const getDestination = (manifest) => {
  return manifest.destination
}

const getWeight = (manifest) => {
  return manifest.weight
}

const getUnit = (manifest) => {
  return manifest.unit
}

const getHazmat =  (manifest) => {
  return manifest.haztmat
}

let normalizeUnits = (manifest) => {
  let newManifest = {...manifest}
  if (getUnit(newManifest) == 'lb') {
    const kg = manifest.weight * 0.45
    newManifest.weight = kg
    newManifest.unit = "kg"
    return newManifest
  } else {
    return newManifest
  }
}

let validateManifest = (manifest) => {
  let missingProp = {}
  for (const [key, val] of Object.entries(manifest)) {
    if(!rules[key](val)) {
      missingProp[key] = "Invalid"
    }
  }
  for (let i = 0; i < properties.length; i++) {
    if (!manifest.hasOwnProperty(properties[i])) {
      missingProp[properties[i]] = "Missing"
    }
  }
  return missingProp
}

let processManifest = (manifest) => {
  if (Object.keys(validateManifest(manifest)).length == 0) {
    console.log(`Validation success: ${getContainerId(manifest)}`)
    console.log(`Total weight: ${getWeight(normalizeUnits(manifest))} kg`)
  } else {
    console.log(`Validation error: ${getContainerId(manifest)}`)
    console.log(validateManifest(manifest))
  }
}