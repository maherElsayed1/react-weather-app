import React, { Component } from 'react'
import "./Header.css"

type Props = {
    selectedCity: string,
    handleCity: (city: string) => void,
    cities: string[]
}

type State = {}

export default class Header extends Component<Props, State> {
    state = {}

    render() {
        return (
            <header className="weather-header">
                <ul className="weather-header__list">
                    {
                        this.props.cities.map((city: string) => (
                            <li
                                key={city}
                                className={`weather-header__list-item ${city === this.props.selectedCity ? 'selected' : ''}`}
                                onClick={() => this.props.handleCity(city)}
                            >
                                {city}
                            </li>
                        ))
                    }
                </ul>
            </header>
        )
    }
}