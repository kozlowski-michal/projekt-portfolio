export interface Project {
    id?: string;
    order: number;      // kolejność sortowania w galerii zbiorczej, określone przez użytkownika, najniższy najpierw
    link: string;       // nazwa w pasku adresu - musi być unikalna
    name: string;       // tytuł projektu
    img?: any[];        // lista obrazków, pierwszy jest miniaturą w zbiorczym widoku, jeśli nie ma to predefiniowany
    about: string;      // opis projektu
    aboutShort: string; // krótki opis (max 100 znaków) do widoku zbiorczego
    date: string;       // data prajektu w formacie: marzec 2020
}

export let newProject = {
    order: null,              
    link: "",                  
    name: "Nowy Projekt",
    about: "Informacje o projekcie.",
    aboutShort: "Krótkie info.",
    date: "marzec 2020",
}

export interface Text { text: string }

