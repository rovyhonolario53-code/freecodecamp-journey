const { useState } = React;

export function EventRSVPForm() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [number, setNumber] = useState(1);
    const [pref, setPref] = useState("")
    const [add, setAdd] = useState(false)

    const [submitted, setSubmitted] = useState(false)

    function handleSubmit(e) {
        e.preventDefault()
        setSubmitted(true);
    }

    return (
        <div id="form-container">
            <form onSubmit={handleSubmit}>
                <label>Name:
                    <input required type="text" value={name} onChange={e => setName(e.target.value)} /></label>
                <label>Email:
                    <input required type="email" value={email} onChange={e => setEmail(e.target.value)} /></label>
                <label>Number of attendees:
                    <input required type="number" min="1" value={number} onChange={e => setNumber(e.target.value)} /></label>
                <label>Dietary Preferences
                    <input type="text" value={pref} onChange={e => setPref(e.target.value)} /></label>
                <label>
                    <span>Bring additional guest</span>
                    <input type="checkbox" checked={add} onChange={e => setAdd(e.target.checked)} />
                </label>
                <button type="submit">Submit</button>
            </form>

            {submitted &&
            <div className="modal-overlay">
                <div className="modal-box">
                    <p>RSVP Submitted!</p>
                    <p>Name: {name}</p>
                    <p>Email: {email}</p>
                    <p>Number of attendees: {number}</p>
                    <p>{pref ? pref : "None"}</p>
                    <p>{add ? "Yes" : "No"}</p>
                    <button onClick={() => setSubmitted(false)}>X</button>
                </div>
            </div>
            }
        </div>
    )
}