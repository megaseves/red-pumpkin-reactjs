import './Contacts.css';

export function Contacts({audioElem, setIsPlaying}) {

    window.addEventListener('load', () => {
        setIsPlaying(false);
        audioElem.current.pause()
    });

  return (
      <div className="contacts-container">
        <h2>Contacts</h2>
      </div>
  );
}