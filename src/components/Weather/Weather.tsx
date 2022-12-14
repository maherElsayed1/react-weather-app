import axios from "axios"
import React, { Component } from 'react'
import Cards from "../Cards/Cards"
import Header from "../Header/Header"
import "./Weather.css"
import { WeatherTypes } from "./Weather.types"

type Props = {}

type State = {
    city?: string,
    weatherData?: {
        loading?: boolean,
        error?: string,
        data?: {
            [cityName: string]: WeatherTypes | null
        }
    }

}

const cities = ["OTTAWA", "MOSCOW", "TOKYO"]

export default class Weather extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            city: cities[0],
            weatherData: {
                loading: false,
                error: "",
                data: {
                    ottawa: null
                }
            }
        };
    }

    getData = async () => {
        this.setState((prevState) => ({
            ...prevState,
            weatherData: {
                ...prevState.weatherData,
                loading: true,
            }
        }))
        try {
            const response = await axios.get<WeatherTypes, any>("https://api.openweathermap.org/data/2.5/forecast/daily", {
                params: {
                    q: this.state.city,
                    appid: process.env.REACT_APP_OPEN_WEATHER_MAP_KEY,
                    cnt: 5,
                    units: "metric"
                }
            });
            this.setState((prevState) => ({
                ...prevState,
                weatherData: {
                    loading: false,
                    data: {
                        ...prevState.weatherData?.data,
                        [this.state.city as string]: response.data,
                    }
                }
            }));
        } catch (error) {
            if (axios.isAxiosError(error)) {
                this.setState({
                    weatherData: {
                        loading: false,
                        error: error.message,
                        data: {
                            [this.state.city as string]: null,
                        }
                    }
                });
            } else {
                this.setState({
                    weatherData: {
                        loading: false,
                        error: "An unexpected error occurred",
                        data: {
                            [this.state.city as string]: null,

                        }
                    }
                });
            }
        }
    }

    componentDidMount() {
        this.getData();
    }

    componentDidUpdate(prevProps: Props, prevState: State) {
        if (prevState.city !== this.state.city) {
            if (!this.state.weatherData?.data![this.state.city!]) {
                this.getData();
            }
        }
    }

    handleCity = (city: string) => {
        this.setState({
            city
        })
    }

    render() {
        return (
            <div className="weather">
                <div className="weather-container">
                    {
                        (!this.state.weatherData?.error) ?
                            <>
                                <Header handleCity={this.handleCity} cities={cities} selectedCity={this.state.city!} />
                                <Cards data={!this.state.weatherData?.loading ? this.state.weatherData?.data![this.state.city!]! : null} isLoading={this.state.weatherData?.loading!} />
                            </>
                            :
                            <div className="error-screen">
                                {this.state.weatherData.error}
                            </div>
                    }
                </div>
            </div>
        )
    }
}