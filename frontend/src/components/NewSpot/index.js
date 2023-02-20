import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { createSpotThunk } from "../../store/spots";
import './newSpot.css'

function CreateSpot() {
    const dispatch = useDispatch();
    const history = useHistory();

    const [country, setCountry] = useState("");
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [url1, setUrl1] = useState("");
    const [url2, setUrl2] = useState("");
    const [url3, setUrl3] = useState("");
    const [url4, setUrl4] = useState("");
    const [url5, setUrl5] = useState("");
    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

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
        if (price.length === 0 || isNaN(price)) error.push('Please provide a valid price')
        if (!price) error.push("Price is required")
        // if (url1.length === 0) error.push('Please provide a valid URL')
        // if (url2.length === 0) error.push('Please provide a valid URL')
        // if (url3.length === 0) error.push('Please provide a valid URL')
        // if (url4.length === 0) error.push('Please provide a valid URL')
        // if (url5.length === 0) error.push('Please provide a valid URL')

        setValidationErrors(error)

    }, [country, address, city, state, lat, lng, name, description, price])

    const handleSubmit = async e => {

        e.preventDefault();
        setHasSubmitted(true);
        if (validationErrors.length) return alert('Sorry! Check your form again')

        const payload = { country, address, city, state, lat, lng, name, description, price}

        const imgData = [];
        if (url1) imgData.push({url: url1, preview: true})
        if (url2) imgData.push({url: url2, preview: true})
        if (url3) imgData.push({url: url3, preview: true})
        if (url4) imgData.push({url: url4, preview: true})
        if (url5) imgData.push({url: url5, preview: true})


        const newSpot = await dispatch(createSpotThunk(payload, imgData))


        if (newSpot) {
            history.push(`/spots/${newSpot.id}`);
        }
    }

    return (
        <div className="form-container">
            <h1>Create a new spot</h1>
            <h3>Where's your place located?</h3>
            <p>Guests will only get your exact address once they booked a reservation.</p>
            {hasSubmitted && validationErrors.length > 0 && (
                <div>
                    The following errors were found:
                    <ul className="errors">
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
                    <input className="user-input" value={name} required placeholder='Name of your spot' onChange={e => setName(e.target.value)}></input>
                </div>
                <h3>Set a base price for your spot</h3>
                <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
                <div>
                    <input className="user-input" value={price} required placeholder='Price per night (USD)' onChange={e => setPrice(e.target.value)}></input>
                </div>
                <h3>Liven up your spot with photos</h3>
                <p>Submit a link to at least one photo to publish your spot.</p>
                <div>
                    <input className="user-input" value={url1} required placeholder='Preview Image URL' onChange={e => setUrl1(e.target.value)}></input>
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
                </div>
                <button className="submit-button">Create Spot</button>
            </form>
        </div>
    )
}
export default CreateSpot;
