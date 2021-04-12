import React, { Component } from "react";
import { ReactiveBase, RatingsFilter, ResultCard, ResultList, ViewSwitcher } from "@appbaseio/reactivesearch";
import ResponsiveStory from "./ResponsiveStory";

export default class ViewSwitcherDefault extends Component {
	constructor(props) {
		super(props);
		this.onData = this.onData.bind(this);
	}

	componentDidMount() {
		ResponsiveStory();
	}

	onData(res) {
		const result = {
			image: "https://www.enterprise.com/content/dam/global-vehicle-images/cars/FORD_FOCU_2012-1.png",
			title: res.name,
			rating: res.rating,
			description: res.brand,
			url: "#"
		};
		return result;
	}

	itemMarkup(marker, markerData) {
		return (
			<a
				className="full_row single-record single_record_for_clone"
				key={markerData._id}
			>
				<div className="text-container full_row" style={{ paddingLeft: "10px" }}>
					<div className="text-head text-overflow full_row">
						<span className="text-head-info text-overflow">
							{marker.name ? marker.name : ""} - {marker.brand ? marker.brand : ""}
						</span>
						<span className="text-head-city">{marker.brand ? marker.brand : ""}</span>
					</div>
					<div className="text-description text-overflow full_row">
						<ul className="highlight_tags">
							{marker.price ? `Priced at $${marker.price}` : "Free Test Drive"}
							{`Rated ${marker.rating}`}
						</ul>
					</div>
				</div>
			</a>
		);
	}

	render() {
		return (
			<ReactiveBase
				app="carstore-dataset"
				url="https://a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b309eb61@appbase-demo-ansible-abxiydt-arc.searchbase.io"
				enableAppbase
			>
				<div className="row">
					<div className="col">
						<RatingsFilter
							componentId="RatingsSensor"
							dataField={this.props.mapping.rating}
							title="RatingsFilter"
							data={
								[{ start: 4, end: 5, label: "4 stars and up" },
									{ start: 3, end: 5, label: "3 stars and up" },
									{ start: 2, end: 5, label: "2 stars and up" },
									{ start: 1, end: 5, label: "> 1 stars" }]
							}
							{...this.props}
						/>
					</div>

					<div className="col">
						<br />
						<ViewSwitcher
							data={[
								{
									label: "Grid",
									value: "rbc-resultcard"
								},
								{
									label: "List",
									value: "rbc-resultlist"
								}
							]}
							defaultSelected="rbc-resultcard"
						/>
						<ResultCard
							componentId="SearchResult"
							dataField={this.props.mapping.name}
							title="Results"
							from={0}
							size={20}
							onData={this.onData}
							react={{
								and: "RatingsSensor"
							}}
						/>
						<ResultList
							componentId="SearchResult"
							dataField={this.props.mapping.name}
							title="Results"
							from={0}
							size={20}
							onData={this.onData}
							sortOptions={[
								{
									label: "Lowest Price First",
									dataField: "price",
									sortBy: "asc"
								},
								{
									label: "Highest Price First",
									dataField: "price",
									sortBy: "desc"
								},
								{
									label: "Most rated",
									dataField: "rating",
									sortBy: "desc"
								}
							]}
							react={{
								and: "RatingsSensor"
							}}
						/>
					</div>
				</div>
			</ReactiveBase>
		);
	}
}

ViewSwitcherDefault.defaultProps = {
	mapping: {
		rating: "rating",
		name: "name"
	}
};

ViewSwitcherDefault.propTypes = {
	mapping: React.PropTypes.shape({
		rating: React.PropTypes.string,
		name: React.PropTypes.string
	})
};
