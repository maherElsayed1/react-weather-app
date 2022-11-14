import React, { Component } from 'react'
import "./Card.css"
import { CardTypes } from "./Card.types"

type Props = {
    cardData: CardTypes
}

type State = {}

export default class Card extends Component<Props, State> {
    state = {}

    render() {
        return (
            <div className="weather-card">
                {this.props.cardData?.main.temp}
                <div>{this.props.cardData?.weather[0]?.description}</div>
            </div>
        )
    }
}