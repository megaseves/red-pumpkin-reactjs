import './TulzoLangAlbum.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faPlay
} from "@fortawesome/free-solid-svg-icons";

export function DemoAlbum(props) {

  let i = 0;

  let listAlbum = props.listAlbum("Demó");
  
  return (
      <div className="album-container-div">
          <div className='album-div'>
            
            <div className='album-header'>

              <div className='album-cover-container' style={{backgroundImage: `url(${process.env.PUBLIC_URL + '/albumBorito.webp'}`}}>

              </div>
              
              <div className='album-details-div'>
                <div className='album-title-div'><h1>Demó album</h1></div>
                <div className='album-title-p-div'><p>Album • 2018</p></div>
                <div className='album-title-p2-div'><p>11 dal • 47 perc 57 másodperc</p></div> {/* 2 854,2 másodperc */}
                <div className='album-description-div'><p>Demó album. Teljesen amatőr kezdeményezéssel indult a Reménytelen c. dal megszületésével. Az albumon jelentősen fellelhető minőségi változás egyes dalok között.</p></div>
                
                <div className='album-control-btns'>
                  <span className='album-control-play-btn' onClick={() => {
                                    props.selectAlbum("Demó");
                                    props.openPlayerComponent();
                                    props.changeSong(11);
                                }}><FontAwesomeIcon className={"play-audio"} icon={faPlay} /> <span>Lejátszás</span></span>
                </div>
              </div>
              
              
            </div>

            <div className='album-songs-div'>

              { listAlbum.length > 0 && listAlbum.map((song) => {
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