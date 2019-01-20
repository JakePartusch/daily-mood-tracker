import React, { Component } from 'react'
import netlifyIdentity from "netlify-identity-widget"
import moment from 'moment';
import "./historyGrid.css";


class HistoryGrid extends Component {

    state = {
        moods: [],
        squares: []
    }
    
    async componentDidMount() {
        const { email } = netlifyIdentity.currentUser();
        const response = await this.getMoodsForUser(email);
        const moods = this.getMoodsMatchingMonth(response, moment().month());
        this.createSquaresForMonth(moods);
        this.setState({ moods });
    }

    getMoodsMatchingMonth = (response, month )=> {
        return response.moodData.filter(mood => {
            const entryDate = moment(mood.entryDate);
            return month === entryDate.month();
        }).map(mood => {
            const entryDate = moment(mood.entryDate);
            return {
                day: entryDate.date(),
                status: mood.status
            }
        })
    }

    createSquaresForMonth = (moods) => {
        const squares = [];
        for( let i = 0; i < moment().startOf('month').day(); i++) {
            squares.push(-1)
        }
        for (let i = 1; i < 31; i++) {
            const matchingDay = moods.find(mood => mood.day === i)
            if(matchingDay) {
                squares.push(matchingDay.status)
            } else {
                squares.push(-2)
            }
        }
        this.setState( { squares });
    }

    getMoodsForUser = async () => {
        const user = netlifyIdentity.currentUser();
        console.log(user);
        const response = await fetch('http://localhost:8000/.netlify/functions/getMoodData', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + user.token.access_token,
          }
        });
        return await response.json();
      }

      getHslCellColor(moodStatus) {
        switch(Number(moodStatus)){
            case -1:
                return '#FFF'
            case 0:
                return `hsl(0, 65%, 50%)`
            case 1:
                return `hsl(0, 65%, 75%)`
            case 2:
                return `hsl(100, 65%, 70%)`
            case 3:
                return `hsl(100, 65%, 45%)`
            case 4:
                return `hsl(100, 65%, 30%)`
        }
      }

    render() {
        const { squares } = this.state; 
        return (
        <div className="graph">
            <ul className="days">
                <li>Sun</li>
                <li>Mon</li>
                <li>Tue</li>
                <li>Wed</li>
                <li>Thu</li>
                <li>Fri</li>
                <li>Sat</li>
            </ul>
            <ul className="squares">
            {squares.map(square => <li style={{backgroundColor: this.getHslCellColor(square)}}></li>)}
            </ul>
        </div>
        )
    }

}

export default HistoryGrid;