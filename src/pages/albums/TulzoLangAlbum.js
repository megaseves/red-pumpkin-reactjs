import './TulzoLangAlbum.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faPlay
} from "@fortawesome/free-solid-svg-icons";

export function TulzoLangAlbum(props) {

  let i = 0;
  
  return (
      <div className="album-container-div">
          <div className='album-div'>
            
            <div className='album-header'>

              <div className='album-cover-container' style={{backgroundImage: `url(${process.env.PUBLIC_URL + '/albumBorito.webp'}`}}>

              </div>
              
              <div className='album-details-div'>
                <div className='album-title-div'><h1>Túlzó láng</h1></div>
                <div className='album-title-p-div'><p>Album • 2022</p></div>
                <div className='album-title-p2-div'><p>11 dal • 47 perc 57 másodperc</p></div> {/* 2 854,2 másodperc */}
                <div className='album-description-div'><p>Első album a zenekar életében. Teljesen amatőr kezdeményezéssel indult a Reménytelen c. dal megszületésével. Az albumon jelentősen fellelhető minőségi változás egyes dalok között.</p></div>
                
                <div className='album-control-btns'>
                  <span className='album-control-play-btn' onClick={() => {
                                    props.selectAlbum("Túlzó láng");
                                    props.openPlayerComponent();
                                    props.changeSong(10);
                                }}><FontAwesomeIcon className={"play-audio"} icon={faPlay} /> <span>Lejátszás</span></span>
                </div>
              </div>
              
            </div>

            <div className='album-songs-div'>

              { props.playList.length > 0 && props.playList.map((song) => {
                  i++;
                  
                return (
                  <>
                    <div className='album-song' key={song.id} onClick={() => props.changeSong(song.id)}>
                      <p>{i}</p>
                      <p className='album-song-title'>{song.title}</p>
                      <p>{song.length}</p>
                    </div>
                  </>
                  )}
                )
              }

            </div>
            
          </div>
      </div>
  );
}