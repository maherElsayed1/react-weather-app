import moment from "moment"
import React, { Component } from 'react'
import "./Card.css"
import { CardTypes } from "./Card.types"

type Props = {
    cardData: CardTypes,
    index: number
}

type State = {}

export default class Card extends Component<Props, State> {
    state = {}
    render() {
        const { cardData } = this.props;
        const date = moment.unix(cardData.dt);
        const isToday = date.format('YYYY-MM-DD') === moment().format('YYYY-MM-DD');

        return (
            <div className="weather-card">
                <div className="weather-card__title-container">
                    <h4 className="weather-card__title">{isToday ? 'Today' : date.format('ddd')}</h4>
                </div>
                <div className="weather-card__results">
                    <div className="weather-card__icon">
                        <i className={`owf owf-${cardData?.weather[0]?.id}`}></i>
                    </div>
                    <div className="weather-card__temp">
                        <span>{cardData?.temp.max}°/{cardData?.temp.min}°</span>
                        {this.props.index === 0 && <span className="weather-card__temp-description">{cardData?.weather[0]?.description}</span>}
                    </div>
                </div>
            </div>
        )
    }
}