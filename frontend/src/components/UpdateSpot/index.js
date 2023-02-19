import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from 'react-router-dom';
import { loadSingleSpotThunk, updateSpotThunk } from "../../store/spots";

function UpdateSpot() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { spotId } = useParams();
    // console.log(spotId);
    const currentUser = useSelector(state => state.session.user);
    // console.log(currentUser);
    const spot = useSelector(state => state.spots.userSpots[spotId])
    // console.log(spot);
    if (currentUser === null) history.push(`/`);


    const [country, setCountry] = useState(spot?.country || "");
    const [address, setAddress] = useState(spot?.address || "")
    const [city, setCity] = useState(spot?.city || "");
    const [state, setState] = useState(spot?.state || "");
    const [lat, setLat] = useState(spot?.lat || "");
    const [lng, setLng] = useState(spot?.lng || "");
    const [name, setName] = useState(spot?.name || "");
    const [description, setDescription] = useState(spot?.description || "");
    const [price, setPrice] = useState(spot?.price || "");
    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {

        const loadInput = async () => {
            const targetSpot = await dispatch(loadSingleSpotThunk(spotId))

            setCountry(targetSpot.country)
            setAddress(targetSpot.address)
            setCity(targetSpot.city)
            setState(targetSpot.state)
            setLat(targetSpot.lat)
            setLng(targetSpot.lng)
            setDescription(targetSpot.description)
            setName(targetSpot.name)
            setPrice(targetSpot.price)
        }
        loadInput();
    }, [dispatch])


    useEffect(() => {
        const error = [];
        if (country.length === 0) error.push('Country is required')
        if (address.length === 0) error.push('Address is required')
        if (city.length === 0) error.push('City is required')
        if (state.length === 0) error.push('State is required')
        if (!Number(lng)) error.push('Please provide a valid lng')
        if (!Number(lat)) error.push('Please provide a valid lat')
        if (name.length === 0) error.push('Name is required')
        if (description.length < 30) error.push('Description needs 30 or more characters')
        if (price <= 0) error.push('Please provide a valid price')
        if (!price) error.push("Price is required")

        setValidationErrors(error)
    }, [country, address, city, state, lat, lng, price, name, description])

    // if (!spot) return null

    const handleSubmit = async e => {
        e.preventDefault();

        setHasSubmitted(true);
        if (validationErrors.length) return alert('Sorry! Check your form again')

        const payload = {
            country: country,
            address: address,
            city: city,
            state,
            lat,
            lng,
            name,
            description,
            price
        }
        console.log("kkkk", payload)

       await dispatch(updateSpotThunk(spotId, payload))


        history.push(`/spots/${spotId}`)


    }

    return (
        <div className="form-container">
            <h1>Update your Spot</h1>
            <h3>Where's your place located?</h3>
            <p>Guests will only get your exact address once they booked a reservation.</p>
            {hasSubmitted && validationErrors.length > 0 && (
                <div>
                    The following errors were found:
                    <ul>
                        {validationErrors.map(error => (
                            <li key={error}>{error}</li>
                        ))}
                    </ul>
                </div>
            )}
            <form className="new-spot-form" onSubmit={handleSubmit}>
                <div>
                    <input className="user-input" value={country} required placeholder='Country' onChange={e => setCountry(e.target.value)}></input>
                </div>
                <div>
                    <input className="user-input" value={address} required placeholder='Address' onChange={e => setAddress(e.target.value)}></input>
                </div>
                <div className="city-state">
                    <input className="user-input" id="city" value={city} required placeholder='City' onChange={e => setCity(e.target.value)}></input>
                    <input className="user-input" id="state" value={state} required placeholder='State' onChange={e => setState(e.target.value)}></input>
                </div>
                <div className="lat-lng">
                    <input className="user-input" id="lat" value={lat} required placeholder='Latitude' onChange={e => setLat(e.target.value)}></input>
                    <input className="user-input" id="lng" value={lng} required placeholder='Longitude' onChange={e => setLng(e.target.value)}></input>
                </div>
                <h3>Describe your place to guests</h3>
                <p>Mention the best features of your place, any special amenities like fast wifi or parking, and what you love about the neighborhood</p>
                <div>
                    <textarea className="description"  value={description} required placeholder='Description' onChange={e => setDescription(e.target.value)}></textarea>
                </div>
                <h3>Create a title for your spot</h3>
                <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
                <div>
                    <input className="user-input" value={name} required placeholder='Name of your Spot' onChange={e => setName(e.target.value)}></input>
                </div>
                <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
                <div>
                    <input className="user-input" value={price} required placeholder='Price per night (USD)' onChange={e => setPrice(e.target.value)}></input>
                </div>

                <button className="submit-button">Update</button>
            </form>
        </div>
    )
}
export default UpdateSpot;
