
export default function Cards({ value, isFlipped, onCardClick ,isVisible }) {
    
    // if (!isVisible) return null;
    return (
            <div className= {`card-container ${isVisible ? "" : "hidden"}`} onClick={onCardClick}>
                <div className={`card-inner ${isFlipped ? 'flipped' : ''}`}>
                    <div className="card-front">❓</div>
                    <div className="card-back">{value}</div>
                </div>
            </div>


        // <button className='card' onClick={onCardClick}>
        //     { isFlipped? value : '❓'}
        // </button>
    )
}
