import { CardTypes } from "../Card/Card.types"

export interface WeatherTypes {
    cod: string,
    message: number | string,
    cnt: number,
    list: CardTypes[],
    city: {
        id: number,
        name: string,
        coord: {
            lat: number,
            lon: number
        },
        country: string,
        population: number,
        timezone: number,
        sunrise: number,
        sunset: number
    }
}