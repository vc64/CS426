import './index.css'

export interface Profile {
   name: string;
   username: string;
   isOrg: boolean;
   points: number;
   img?: string;
}

export function ProfileButton({ profile }: { profile: Profile }) {   
   return (
      <button style={{ border: 'none', background: 'none', padding: 0, cursor: 'pointer' }}>
         <img
            src={profile.img}
            alt={`${profile.name}'s profile`}
            style={{ borderRadius: '50%', width: '50px', height: '50px' }}
         />
      </button>
   );
}

export function OrgProfile({ profile }: { profile: Profile }) {
   return (
      <div>
         <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}></div>
            <img src={profile.img} alt={`${profile.name}'s profile`} style={{ borderRadius: '50%', width: '100px', height: '100px' }} />
            <h1>{profile.name}</h1>
            <p>@{profile.username}</p>
            <p>{profile.points} points</p>
            <div style={{ width: '80%', backgroundColor: '#e0e0e0', borderRadius: '10px', overflow: 'hidden' }}>
               <div
                  style={{
                     width: `${Math.min(profile.points, 100)}%`,
                     backgroundColor: '#76c7c0',
                     height: '10px',
                  }}
               ></div>
            </div>
      </div>
   );
}