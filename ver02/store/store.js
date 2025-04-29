//generate id
export function generateId() {
  //todo: uuid
  return Math.floor(Math.random() * 1000000);
}
//generate timestamp
export function generateTimestamp() {
  return new Date().getTime();
}
//check default category
export function checkDefaultCategory() {
  //getDefaultCategory
  return false;
}
