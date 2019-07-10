import React from 'react'
import _ from "lodash";
import {Dropdown} from 'semantic-ui-react'
import { Pie } from 'react-chartjs-2';

export default class GenrePie extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            filteredAlbums: props.albums
        }
    }

    handleDateFilter = (dateFilter) => {
        let currentDate = new Date()
        if (dateFilter === "today") {
            this.setState({
                filteredAlbums: this.props.albums.filter(album => {
                let albumDate = new Date(album.date_listened_to)
                    if (currentDate.getDate() === albumDate.getDate() && currentDate.getMonth() === albumDate.getMonth() && currentDate.getYear() === albumDate.getYear()) {
                        return album
                    }
                })
            })
        }
        else if (dateFilter === "week") {
            currentDate.setDate(currentDate.getDate()-7)
            this.setState({
                filteredAlbums: this.props.albums.filter(album => {
                let albumDate = new Date(album.date_listened_to)
                    if (albumDate >= currentDate) {
                        return album
                    }
                })
            })
        }
        else if (dateFilter === "month") {
            currentDate.setMonth(currentDate.getMonth()-1)
            this.setState({
                filteredAlbums: this.props.albums.filter(album => {
                let albumDate = new Date(album.date_listened_to)
                    if (albumDate >= currentDate) {
                        return album
                    }
                })
            })
        }
        else if (dateFilter === "year") {
            currentDate.setYear(currentDate.getYear()-1)
            this.setState({
                filteredAlbums: this.props.albums.filter(album => {
                let albumDate = new Date(album.date_listened_to)
                    if (albumDate >= currentDate) {
                        return album
                    }
                })
            })
        }
        else if (dateFilter === "all") {
            this.setState({
                filteredAlbums: this.props.albums
            })
        }
    }

    render() {
        const {artists, albums} = this.props
        const {filteredAlbums, dateFilter} = this.state
       
        //random colors for pie
        let dynamicColors = function() {
            let r = Math.floor(Math.random() * 255);
            let g = Math.floor(Math.random() * 255);
            let b = Math.floor(Math.random() * 255);
            return "rgb(" + r + "," + g + "," + b + ")";
         };

        //get the unique genres
        let genreData = _.uniq(_.flatten(artists.map(artist => artist.genres.length >= 3 ? artist.genres.slice(0,2) : artist.genres[0]))).map(genre => {
            return {
                label: genre, 
                count: 0,
                color: dynamicColors()
            }
        })
        //find the count of listened to albums for each genre
        genreData.forEach(genre => {
            artists.forEach(artist => {
                if (artist.genres.includes(genre.label) && filteredAlbums.filter(album => album.artists[0].id === artist.id)) {
                    genre.count += filteredAlbums.filter(album => album.artists[0].id === artist.id).length
                }
            })
        })
        //filter out counts of 0 
        genreData = genreData.filter(genre => genre.count > 0)
        let colors = genreData.map(genre => dynamicColors())
        const data = {
            labels: genreData.map(genre => genre.label),
            datasets: [{
                data: genreData.map(genre => genre.count),
                backgroundColor: colors,
                hoverBackgroundColor: colors
            }]
        };
        //dropdown options
        const dateOptions =[
            {
                key: "Today",
                text: "Today",
                value: "today",
            },
            {
                key: "Last Week",
                text: "Last Week",
                value: "week",
            },
            {
                key: "Last Month",
                text: "Last Month",
                value: "month",
            },
            {
                key: "Last Year",
                text: "Last Year",
                value: "year",
            },
            {
                key: "All Time",
                text: "All Time",
                value: "all",
            },
        ]

		return (
            <div>
              <h2 >Albums Listened to by Genre</h2>
              <Dropdown placeholder='Date Listened To' search selection options={dateOptions} onChange={(e, {value}) =>this.handleDateFilter(value)}/>
              <Pie data={data} />
            </div>
          );
    }
}