




// // src/constants/locations.ts
// type LocationOption = {
//     value: string;
//     label: string;
//   };
  
//   type LocationGroup = {
//     group: string;
//     options: LocationOption[];
//   };
  
//   export type LocationItem = LocationOption | LocationGroup;
  
//   export const locations: LocationItem[] = [
//     { value: '', label: 'All Locations' },
//     {
//       group: 'Nigeria',
//       options: [
//         { value: 'nigeria', label: 'All Nigeria' },
//         { value: 'jos', label: 'Jos, Plateau' },
//         { value: 'lagos', label: 'Lagos' },
//         { value: 'abuja', label: 'Abuja' }
//       ]
//     },
//     {
//       group: 'Other Countries',
//       options: [
//         { value: 'ghana', label: 'Ghana' },
//         { value: 'kenya', label: 'Kenya' }
//       ]
//     }
//   ];



// src/constants/locations.ts

// Base location interface
interface BaseLocation {
    value: string;
    label: string;
  }
  
  // Location with nested options
  interface NestedLocation extends BaseLocation {
    options?: LocationOption[];
  }
  
  // Regular location option
  export type LocationOption = BaseLocation | NestedLocation;
  
  // Location group (for optgroups)
  export interface LocationGroup {
    group: string;
    options: LocationOption[];
  }
  
  export type LocationItem = LocationGroup | LocationOption;
  
  export const locations: LocationItem[] = [
    { value: '', label: 'All Locations' },
    {
      group: 'Nigeria',
      options: [
        { value: 'nigeria', label: 'All Nigeria' },
        { 
          value: 'jos', 
          label: 'Jos, Plateau',
          options: [
            { value: 'jos_all', label: 'All Jos' },
            { value: 'rayfield', label: 'Rayfield' },
            { value: 'abattoir', label: 'Abattoir' },
            { value: 'bukuru', label: 'Bukuru' },
            { value: 'angwan_rogo', label: 'Angwan Rogo' },
            { value: 'angwan_rukuba', label: 'Angwan Rukuba' },
            { value: 'jenta', label: 'Jenta' },
            { value: 'laranto', label: 'Laranto' },
            { value: 'terminus', label: 'Terminus' },
            { value: 'vom', label: 'Vom' },
            { value: 'zaria_road', label: 'Zaria Road' },
            { value: 'farin_gada', label: 'Farin Gada' },
            { value: 'hawan_kibo', label: 'Hawan Kibo' },
          ]
        },
        { value: 'lagos', label: 'Lagos' },
        { value: 'abuja', label: 'Abuja' }
      ]
    },
    {
      group: 'Other Countries',
      options: [
        { value: 'ghana', label: 'Ghana' },
        { value: 'kenya', label: 'Kenya' }
      ]
    }
  ];