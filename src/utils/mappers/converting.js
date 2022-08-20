export {};
// import imageCompression from "browser-image-compression";
// import { v4 as uuidv4 } from "uuid";
// import { backModel } from "../../models/backModel";

// export const convertToFrontModel = (userData) => {
//   if (!userData) return null;
//   for (let key in backModel) {
//     if (!userData[key]) {
//       userData[key] = backModel[key];
//     }
//   }
//   userData.born = returnDDMMYYYY(userData?.born);
//   userData.died = returnDDMMYYYY(userData?.died);
//   return userData;
// };

// export const convertToBackModel = ({ data }) => {
//   const converted = {
//     born: new Date(data.born).toISOString(),
//     died: new Date(data.died).toISOString(),
//     gifts: {
//       candies: [],
//       btc: [],
//       vodka: [],
//     },
//     chatLogs: [],
//     graveCellNum: Number(data.graveCellNum),
//     id: uuidv4(),
//     lastWords: data.lastWords,
//     photos: data.photos,
//     name: data.name,
//     songs: [data.song],
//   };
//   for (let key in converted) {
//     if (converted[key] === undefined) {
//       throw new Error(
//         `Back model is not consistent! No ${key} value provided! JSON: ` +
//           JSON.stringify(converted, null, 1)
//       );
//     }
//   }
//   return converted;
// };

// export const returnDDMMYYYY = (date) => {
//   if (!date) date = new Date().toISOString();
//   let options = {
//     year: "numeric",
//     month: "numeric",
//     day: "numeric",
//   };
//   return new Date(date).toLocaleDateString("ru-RU", options);
// };

// export const compressPhotos = async (e) => {
//   let files = [...e.target.files];
//   if (!files.length) return;
//   try {
//     files = await Promise.all(
//       files.map(
//         async (item) =>
//           await imageCompression(item, {
//             maxSizeMB: 0.5,
//             maxWidthOrHeight: 900,
//             useWebWorker: true,
//           })
//       )
//     );
//   } catch (e) {
//     alert("35: " + e);
//     console.error(e);
//     console.trace(e);
//   }
//   if (!files.length) {
//     alert("No photos been compressed");
//     return;
//   }
//   return files.map((file) => ({
//     file,
//     url: URL.createObjectURL(file),
//     id: URL.createObjectURL(file),
//   }));
// };

// export const convertToISO = (ddmmyyyy) => {
//   const dateArr = ddmmyyyy.split(".");
//   return new Date(dateArr[2], dateArr[1] - 1, dateArr[0]).toISOString();
// };

// const returnPhrases = (id) => {
//   switch (id) {
//     case "candies":
//       return "a candy";
//     case "vodka":
//       return "a shot of vodka";
//     case "btc":
//       return "1 BTC";
//     default:
//       return "a message";
//   }
// };

// export const updateGiftsOnGrave = (data, grave) => {
//   if (!data || !grave) throw new Error("No data or user in updateUserGifts");
//   grave = JSON.stringify(grave);
//   let graveClone = { ...JSON.parse(grave) };
//   if (!graveClone.gifts[data.gift]) {
//     graveClone.gifts[data.gift] = [];
//   }
//   graveClone.gifts[data.gift] = [
//     ...graveClone.gifts[data.gift],
//     { by: data.name, wish: data.wish },
//   ];
//   graveClone.chatLogs = [
//     ...graveClone.chatLogs,
//     `${data?.name} left ${returnPhrases(data?.gift)} for ${graveClone?.name}`,
//   ];
//   if (data?.wish?.length > 1) {
//     graveClone.chatLogs = [
//       ...graveClone.chatLogs,
//       `${data.name} left a message for ${graveClone.name}: "${data.wish}"`,
//     ];
//   }
//   graveClone.born = convertToISO(graveClone.born);
//   graveClone.died = convertToISO(graveClone.died);
//   return graveClone;
// };

// export const contactsFromF2B = (contacts) => {
//   let set = new Set();
//   for (let contact in contacts) {
//     if (!!contact && !!contacts[contact]) set.add(contact);
//   }
//   const array = [];
//   set.forEach((contact) => {
//     array.push({ platform: contact, link: contacts[contact], active: true });
//   });
//   return array;
// };

// export const contactsFromB2F = (contacts) => {
//   if (!contacts) return {};
//   let obj = {};
//   contacts.forEach((contact) => {
//     if (!contact.platform || !contact.link) return;
//     obj[contact.platform] = contact.link;
//   });
//   return obj;
// };
