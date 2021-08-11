import "../styles/Profile.scss";
import "../styles/Home.scss";
import "../styles/Buttons.scss";
import React, { useState, useEffect } from "react";
import PageNav from "./PageNav";
import { Button, Style } from "./Button";
import { SightingApiModel } from "../api/models/SightingApiModel";
import Card from "./Card";
import { fetchPendingSightings } from "../api/apiClient";
import { makeAdmin, checkAdmin, removeAdmin } from "../api/apiClient";

export function Profile(): JSX.Element {
    const [feedToggle, setFeedToggle] = useState("Sightings");
    const [page, setPage] = useState(1);
    const [isUserAdmin, setIsUserAdmin] = useState(false);
    const [data, setData] = useState<SightingApiModel[]>([]);
    //TODO - get username from user api model
    const username = "username";

    useEffect(() => {
        checkifAdmin();
    }, []);

    async function checkifAdmin() {
        setIsUserAdmin(await checkAdmin());
    }

    async function makeAdminHandler() {
        await makeAdmin()
            .then(() => setIsUserAdmin(true));
    }

    async function removeAdminHandler() {
        await removeAdmin()
            .then(() => setIsUserAdmin(false))
            .then(() => setFeedToggle("Sightings"));
    }

    const orca: SightingApiModel = {
        id: 1,
        sightedAt: new Date().toDateString(),
        species: "whale",
        quantity: 1,
        location: "Deep Ocean",
        longitude: 1.232,
        latitude: 2.312,
        description: "Whales at sea",
        orcaType: "Whale",
        orcaPod: "k",
        confirmed: false,
        userId: 2,
        username: "FakeUser1"
    };

    const orcaConfirmed: SightingApiModel = {
        id: 2,
        sightedAt: new Date().toDateString(),
        species: "orca",
        quantity: 3,
        location: "Sea",
        longitude: 1.232,
        latitude: 2.312,
        description: "Whales at sea",
        orcaType: "Orca",
        orcaPod: "",
        confirmed: true,
        userId: 2,
        username: "FakeUserConfirmed"
    };

    function nextPage() {
        setPage(page + 1);
        //eslint-disable-next-line
        console.log(page);
    }

    function previousPage() {
        setPage(page - 1);
        //eslint-disable-next-line
        console.log(page);
    }

    useEffect(() => {
        if (feedToggle == "Approvals") {
            fetchPendingSightings(page)
                .then(data => setData(data));
        }
        else {
            setData([orca, orcaConfirmed]);
        }
    }, [feedToggle, page]);

    const cards = data.map((s, index) => <Card sighting={s} key={index} />);

    return (
        <div className="body">
            <div className="profile-pane">
                <div className="outer-container">
                    <div>
                        <h1 className="heading">UserName</h1>
                        <p className="joined little-text"> Joined: June 2004</p>
                        <div className="trophy-container">
                            <p className="feature-text"> 15</p>
                            <p className="reported little-text"> Reported <br /> Sightings</p>
                            <img className="trophy-image" alt="Trophy Image" src="https://picsum.photos/id/215/50" />
                        </div>
                        <img className="profile-image" alt="Profile Image" src={`https://robohash.org/${username}?set=any&bgset=any`} />
                    </div>
                    <div className="button-container">
                        <Button
                            style={Style.primary}
                            text="Sightings"
                            onClick={() => setFeedToggle("Sightings")}
                        />
                        <Button 
                            style={Style.primary} 
                            text="Approvals"
                            onClick={() => setFeedToggle("Approvals")}
                            dataTestId="approval-toggle"
                            hidden={!isUserAdmin}
                        />
                        <Button
                            style={Style.secondary}
                            text="Make Admin"
                            onClick={makeAdminHandler}
                            hidden={isUserAdmin}
                            dataTestId="make-admin" />
                        <Button
                            style={Style.secondary}
                            text="Remove Admin"
                            onClick={removeAdminHandler}
                            hidden={!isUserAdmin}
                            dataTestId="remove-admin" />
                    </div>
                </div>
            </div>
            <div className="feed">
                <h1 className="heading">Your {feedToggle}</h1>
                <div className="card-holder">
                    {cards}
                </div>
                <PageNav page={page} nextPage={nextPage} previousPage={previousPage} />
            </div>
        </div>
    );
}