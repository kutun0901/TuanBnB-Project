function SpotCard ({spot}) {
    return (
        <div>
            <div className="img-container" >
                <img src={spot.previewImage}
                alt="preview-img"/>
            </div>
            <div>
                <div>{spot.city}, {spot.state}</div>
                <div>{spot.avgRating}</div>
            </div>
            <div>{`$ ${spot.price} night`}</div>
        </div>
    )
}

export default SpotCard;
