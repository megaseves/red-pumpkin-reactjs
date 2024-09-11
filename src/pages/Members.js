import './Members.css';

export function Members() {


    return (
        <div className="members-container">
            <div className='members'>
                <div className='member' style={{backgroundImage: `url(${process.env.PUBLIC_URL + '/members/gyenes_jonas_levente_red_pumpkin_pic.png'})`}}>
                    <div className='member-title'>Levi</div>
                    <div className='member-role'>fitár, ének</div>
                </div>
                <div className='member' style={{backgroundImage: `url(${process.env.PUBLIC_URL + '/members/schmiedt_attila_red_pumpkin_pic.png'})`}}>
                    <div className='member-title'>Ató</div>
                    <div className='member-role'>gitár, ének</div>
                </div>
                <div className='member' style={{backgroundImage: `url(${process.env.PUBLIC_URL + '/members/aron_red_pumpkin_pic.png'})`}}>
                    <div className='member-title'>Áron</div>
                    <div className='member-role'>basszusgitár</div>
                </div>
                <div className='member' style={{backgroundImage: `url(${process.env.PUBLIC_URL + '/members/keressuk_enekes_red_pumpkin_pic.png'})`}}>
                    <div className='member-title'>Keressük...</div>
                    <div className='member-role'>főének</div>
                </div>
                <div className='member' style={{backgroundImage: `url(${process.env.PUBLIC_URL + '/members/keressuk_dobos_red_pumpkin_pic.png'})`}}>
                    <div className='member-title'>Keressük...</div>
                    <div className='member-role'>dob</div>
                </div>
                
            </div>
            
        </div>
    );
}