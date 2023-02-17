import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from 'react-router-dom';
import { loadAllSpots, loadSingleSpotThunk, loadUserSpotThunk, updateSpotThunk } from "../../store/spots";

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

    // useEffect(() => {
    //     const result = dispatch(loadUserSpotThunk(spotId))
    //     console.log(result);
    // }, [dispatch])

    // useEffect(() => {

    //     const fillFields = async () => {
    //       const spotList = await dispatch(loadAllSpots())

    //       const targetSpot = spotList[spotId]


    //       setCountry(targetSpot.country)
    //       setAddress(targetSpot.address)
    //       setCity(targetSpot.city)
    //       setState(targetSpot.state)
    //       setLat(targetSpot.latitude)
    //       setLng(targetSpot.longitude)
    //       setDescription(targetSpot.description)
    //       setName(targetSpot.name)
    //       setPrice(targetSpot.price)
    //     }

    //     fillFields();

    //   }, [dispatch])


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
        const error = [];
        if (country.length === 0) error.push('Please provide a valid country')
        if (address.length === 0) error.push('Please provide a valid address')
        if (city.length === 0) error.push('Please provide a valid city')
        if (state.length === 0) error.push('Please provide a valid state')
        if (!Number(lng)) error.push('Please provide a valid lng')
        if (!Number(lat)) error.push('Please provide a valid lat')
        if (name.length === 0) error.push('Please provide a valid Name')
        if (description.length === 0) error.push('Please provide a valid description')
        if (price <= 0 || price === "" || !Number(price)) error.push('Please provide a valid price')

        setValidationErrors(error)

    }, [country, address, city, state, lat, lng, name, description, price])


    // if (!spot) return null

    const handleSubmit = async e => {

        e.preventDefault();
        setHasSubmitted(true);
        if (validationErrors.length) return alert('Sorry! Check your form again')

        const payload = {
            country,
            address,
            city,
            state,
            lat: Number(lat),
            lng: Number(lng),
            name,
            description,
            price: Number(price)
        }
        // console.log(payload)

        await dispatch(updateSpotThunk(spot.id, payload))

        history.push(`/spots/${spot.id}`)

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
                <div>
                    <input className="user-input" value={city} required placeholder='City' onChange={e => setCity(e.target.value)}></input>
                </div>
                <div>
                    <input className="user-input" value={state} required placeholder='State' onChange={e => setState(e.target.value)}></input>
                </div>
                <div>
                    <input className="user-input" value={lat} required placeholder='Latitude' onChange={e => setLat(e.target.value)}></input>
                </div>
                <div >
                    <input className="user-input" value={lng} required placeholder='Longitude' onChange={e => setLng(e.target.value)}></input>
                </div>
                <h3>Describe your place to guests</h3>
                <p>Mention the best features of your place, any special amenities like fast wifi or parking, and what you love about the neighborhood</p>
                <div>
                    <input className="description" type="textArea" value={description} required placeholder='Description' onChange={e => setDescription(e.target.value)}></input>
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
                {/* <div>
                    <input className="user-input" value={url1}  placeholder='Image URL' onChange={e => setUrl1(e.target.value)}></input>
                </div>
                <div>
                    <input className="user-input" value={url2}  placeholder='Image URL' onChange={e => setUrl2(e.target.value)}></input>
                </div>
                <div>
                    <input className="user-input" value={url3} placeholder='Image URL' onChange={e => setUrl3(e.target.value)}></input>
                </div>
                <div>
                    <input className="user-input" value={url4} placeholder='Image URL' onChange={e => setUrl4(e.target.value)}></input>
                </div>
                <div>
                    <input className="user-input" value={url5} placeholder='Image URL' onChange={e => setUrl5(e.target.value)}></input>
                </div> */}
                <button className="submit-button">Update</button>
            </form>
        </div>
    )
}
export default UpdateSpot;
