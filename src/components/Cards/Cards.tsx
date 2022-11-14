import React, { Component } from 'react'
import Card from "../Card/Card"
import { CardTypes } from "../Card/Card.types"
import { WeatherTypes } from "../Weather/Weather.types"
import "./Cards.css"

type Props = {
    data: WeatherTypes | null
}

type State = {}


export default class Cards extends Component<Props, State> {
    state = {}

    render() {
        return (
            <main className="weather-cards">
                {
                    this.props.data?.list?.map((cardData: CardTypes) => (
                        <Card key={cardData.dt} cardData={cardData} />
                    ))
                }
            </main>
        )
    }
}