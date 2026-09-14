/*
Build a Device Loan Ledger
You are a software developer tasked with creating a ledger application to manage IT hardware devices provisioned by your company's Service Desk. The ledger is an object whose keys are asset tags and whose values are objects:

const ledger = {
  "1": {
    type: "Laptop",
    status: "CheckedIn",
    borrower: {
      name: "",
      email: ""
    },
    dueDate: ""
  }
};
Objective: Fulfill the user stories below and get all the tests to pass to complete the lab.

User Stories:

You should model the ledger as an object where each device is keyed by its asset tag and has type, status, borrower (with name and email), and dueDate properties.
You should implement a checkoutDevice(ledger, assetTag, borrower) function that takes a ledger object and clones it without mutating the original. On the clone, it should set the borrower object's name and email, update the status to "CheckedOut", and return an object of the form { ledger: updatedLedger, message: confirmationString }, where the message includes the asset tag and the borrower object's name.

If assetTag does not exist in the ledger, the function should return the ledger unchanged along with a message that includes the asset tag and explains that it was not found.
If the device is already "CheckedOut", the function should return the ledger unchanged and leave the current borrower in place, along with a message that includes the asset tag and explains that the device is already checked out.
You should implement a checkinDevice(ledger, assetTag) function that takes a ledger object and clones it without mutating the original. On the clone, it should clear the borrower object's name and email, reset dueDate to "", update the status to "CheckedIn", and return an object of the form { ledger: updatedLedger, message: confirmationString }, where the message includes the asset tag.

If assetTag does not exist in the ledger, the function should return the ledger unchanged along with a message that includes the asset tag and explains that it was not found.
You should implement a listOverdueDevices(ledger, today) function that takes a ledger object and returns an array of the device objects that are overdue, sorted by dueDate in ascending order. A device is overdue when its status is "CheckedOut" and its dueDate is strictly before today. Both today and dueDate are strings in month/day/year order, and the month and day may or may not be zero-padded (for example, "9/5/2025" and "09/05/2025" are both valid).
You should not use the JavaScript Date object anywhere in your code.
You should implement a serializeLedger(ledger) function that converts the ledger object into a JSON string, and a loadLedger(json) function that converts a JSON string back into a JavaScript object.
Tests:

Passed: 1. You should create a function named checkoutDevice.
Passed: 2. You should create a function named checkinDevice.
Passed: 3. You should create a function named listOverdueDevices.
Passed: 4. You should create a function named serializeLedger.
Passed: 5. You should create a function named loadLedger.
Passed: 6. Your checkoutDevice function should not mutate the original ledger.
Passed: 7. Your checkoutDevice function should set the borrower's name and email, and set status to "CheckedOut".
Passed: 8. Your checkoutDevice function should return a confirmation message that includes the asset tag and the borrower's name.
Passed: 9. Your checkoutDevice function should preserve unrelated devices and unchanged fields in the returned ledger.
Passed: 10. Your checkoutDevice function should return the ledger unchanged and a message that includes the asset tag when the asset tag is not found.
Passed: 11. Your checkoutDevice function should return the ledger unchanged, leave the current borrower in place, and return a message that includes the asset tag when the device is already checked out.
Passed: 12. Your checkinDevice function should not mutate the original ledger.
Passed: 13. Your checkinDevice function should clear the borrower's name and email, reset dueDate to "", and set status to "CheckedIn".
Passed: 14. Your checkinDevice function should return a confirmation message that includes the asset tag.
Passed: 15. Your checkinDevice function should preserve unrelated devices and unchanged fields in the returned ledger.
Passed: 16. Your checkinDevice function should return the ledger unchanged and a message that includes the asset tag when the asset tag is not found.
Passed: 17. Your listOverdueDevices function should return an array.
Passed: 18. Your listOverdueDevices function should return only overdue devices with a status of "CheckedOut".
Passed: 19. Your listOverdueDevices function should return the overdue devices sorted by dueDate in ascending order.
Passed: 20. Your listOverdueDevices function should sort correctly even when the month or day is not zero-padded.
Passed: 21. You should not use the JavaScript Date object anywhere in your code.
Passed: 22. Your serializeLedger function should return a JSON string that represents the ledger passed to it.
Passed: 23. Your loadLedger function should return the JavaScript object that the JSON string represents.
*/

const equipmentLedger = {
  "1": { type: "PC", status: "CheckedOut", borrower: { name: "John Smith", email: "john@acme.org" }, dueDate: "1/30/2024" },
  "2": { type: "Laptop", status: "CheckedIn", borrower: { name: "", email: "" }, dueDate: "" },
  "3": { type: "Laptop", status: "CheckedOut", borrower: { name: "Jane Doe", email: "jane@acme.org" }, dueDate: "3/31/2025" },
  "4": { type: "iPad", status: "CheckedIn", borrower: { name: "", email: "" }, dueDate: "" }
};

const checkoutDevice = (ledger, assetTag, borrower) => {
  let cpObj = structuredClone(ledger);
  if (!cpObj[assetTag]) {
    return { ledger: cpObj, message: `${assetTag} not found`} 
  }
  if (cpObj[assetTag]['status'] === 'CheckedOut') {
    return {ledger: cpObj, message: `${assetTag} has already checked out`}
  } else {
    cpObj[assetTag]['borrower']['name'] = borrower['name'];
    cpObj[assetTag]['borrower']['email'] = borrower['email'];
    cpObj[assetTag]['status'] = 'CheckedOut';
    return {ledger: cpObj, message: `Asset ${assetTag} checked out by ${borrower['name']}`}
  }
}

const checkinDevice = (ledger, assetTag) => {
  let cpObj = structuredClone(ledger);
  if (!cpObj[assetTag]) {
    return { ledger: cpObj, message: `${assetTag} not found`} 
  }
  cpObj[assetTag]['borrower']['name'] = '';
  cpObj[assetTag]['borrower']['email'] = '';
  cpObj[assetTag]['status'] = 'CheckedIn';
  cpObj[assetTag]['dueDate'] = '';
  return {ledger: cpObj, message: `Asset ${assetTag} checked in.`}
}

const listOverdueDevices = (ledger, today) => {
  let overdueDevices = []
  for ( const assetTag in ledger) {
    const device = ledger[assetTag]
    if (device.status === 'CheckedOut' && device.dueDate !== '' && parseDmyString(device.dueDate) < parseDmyString(today)) {
      overdueDevices.push(structuredClone(device))
    }
  }
  return overdueDevices.sort((a, b) => parseDmyString(a.dueDate) - parseDmyString(b.dueDate))
}

const serializeLedger = (ledger) => {
  const stringify = JSON.stringify(ledger)
  return stringify
}

const loadLedger = (json) => {
  const toJson = JSON.parse(json)
  return toJson
}

function parseDmyString(dateStr) {
  const [month, day, year] = dateStr.split('/');
  // Pad the day and month with a leading zero if they are single digits
  const paddedDay = day.padStart(2, '0');
  const paddedMonth = month.padStart(2, '0');
  return parseInt(`${year}${paddedMonth}${paddedDay}`, 10);
}