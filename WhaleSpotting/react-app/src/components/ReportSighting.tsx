/* eslint-disable */
import "../styles/ReportSighting.scss";
import React, { useState } from "react";
import { BannerImage } from "./BannerImage";
import { CreateSightingApiModel, Species, OrcaType } from "../apiModels/CreateSightingApiModel";

export default function ReportSighting(): JSX.Element {
    const [date, setDate] = useState<Date>(new Date());
    const [location, setLocation] = useState("");
    const [species, setSpecies] = useState<Species>(1);
    const [quantity, setQuantity] = useState(0);
    const [longitude, setLongitude] = useState("");
    const [latitude, setLatitude] = useState("");
    const [orcaPod, setOrcaPod] = useState("");
    const [orcaType, setorcaType] = useState<OrcaType>(1);
    const [description, setDescription] = useState("");
    const [responseMessage, setResponseMessage] = useState("");

    async function handleSubmit(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        const sighting: CreateSightingApiModel = {
            species: species,
            quantity: quantity,
            description: description,
            longitude: parseInt(longitude),
            latitude: parseInt(latitude),
            location: location,
            sightedAt: date,
            orcaPod: orcaPod,
            orcaType: orcaType
        };

        console.log(JSON.stringify(sighting));
        let isError = false;
        const response = await fetch(`/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(sighting),
        })
            .then(r => {
                if (r.status === 400) {
                    isError = true;
                    return r.json();
                }
                return r.json();
            })
            .catch(r => {
                isError = true;
                return r.json()
            });
        if (isError) {
            handleError(response);
        } else {
            setResponseMessage("Successful submission. An admin will review it shortly.");
        }
    };

    function handleError(response: any) {
        const keys = Object.keys(response.errors);
        setResponseMessage(response.errors[keys[0]][0]);
    }

    function ShowResultMessage(): JSX.Element | void {
        if (responseMessage) {
            return (
                <p className="response-message card-component">
                    {responseMessage}
                </p>)
        }
    }

    return (
        <div className="report-sighting" data-testid="report-sighting">
            <BannerImage />
            <div className="container">
                <div className="title">Report Your Sighting</div>
                <form>
                    <div className="card-component">
                        <div className="sighting-details">
                            <div className="input-box">
                                <label >Sighting Date Time <span className="required">(required)</span></label>
                                <input className="input-field" name="date" type="date" placeholder="Enter sighting date" required
                                    onChange={(e) => setDate(new Date(e.target.value))} />
                            </div>
                            <div className="input-box">
                                <label>Location <span className="required">(required)</span></label>
                                <input className="input-field" type="text" name="location" placeholder="Enter your location" required
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)} />
                            </div>
                            <div className="input-box">
                                <label>Species <span className="required">(required)</span></label>
                                <select className="input-field" onChange={(e) => { setSpecies(parseInt(e.target.value)); }}>
                                    <option selected value={Species.AtlanticWhiteSidedDolphin}>Atlantic White Sided Dolphin</option>,
                                    <option value={Species.CaliforniaSeaLion}>California Sea Lion</option>,
                                    <option value={Species.DallsPorpoise}>Dalls Porpoise</option>,
                                    <option value={Species.GrayWhale}>Gray Whale</option>,
                                    <option value={Species.HarborPorpoise}>Harbor Porpoise</option>,
                                    <option value={Species.HarborSeal}>Harbor Seal</option>,
                                    <option value={Species.Humpback}>Humpback</option>,
                                    <option value={Species.Minke}>Minke</option>,
                                    <option value={Species.NorthernElephantSeal}>Northern Elephant Seal</option>,
                                    <option value={Species.Orca}>Orca</option>,
                                    <option value={Species.Other}>Other</option>,
                                    <option value={Species.PacificWhiteSidedDolphin}>Pacific White Sided Dolphin</option>,
                                    <option value={Species.SeaOtter}>Sea Otter</option>,
                                    <option value={Species.SouthernElephantSeal}>Southern Elephant Seal</option>,
                                    <option value={Species.StellerSeaLion}>Steller Sea Lion</option>,
                                    <option value={Species.Unknown}>Unknown</option>,
                                </select>
                            </div>
                            <div className="input-box">
                                <label>Quantity</label>
                                <input className="input-field" type="number" placeholder="Enter quantity"
                                    value={quantity}
                                    onChange={(e) => setQuantity(parseInt(e.target.value))} />
                            </div>
                            <div className="input-box">
                                <label>Longitude</label>
                                <input className="input-field coordinates" type="number" placeholder="Enter your longitude"
                                    value={longitude}
                                    onChange={(e) => setLongitude(e.target.value)} />
                            </div>
                            <div className="input-box">
                                <label>Latitude</label>
                                <input className="input-field coordinates" type="number" placeholder="Enter your latitude"
                                    value={latitude}
                                    onChange={(e) => setLatitude(e.target.value)} />
                            </div>
                            <div className="input-box">
                                <label>Orca Type <span className="required">(required)</span></label>
                                <select className="input-field" onChange={(e) => { setorcaType(parseInt(e.target.value)); }}>
                                    <option selected value={OrcaType.NorthernResident}>Northern Resident</option>,
                                    <option value={OrcaType.Offshore}>Offshore</option>,
                                    <option value={OrcaType.SouthernResident}>Southern Resident</option>,
                                    <option value={OrcaType.Transient}>Transient</option>,
                                </select>
                            </div>
                            <div className="input-box">
                                <label>Orca Pod</label>
                                <input className="input-field" type="text" placeholder="Enter the orca pod"
                                    value={orcaPod}
                                    onChange={(e) => setOrcaPod(e.target.value)} />
                            </div>
                            <div className="input-box description">
                                <label>Description</label>
                                <input className="input-field" type="textarea" placeholder="Enter description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <button onClick={handleSubmit} className="submit-button">
                        Submit Sighting
                    </button>
                    {ShowResultMessage()}
                </form>
            </div>
        </div>
    );
}