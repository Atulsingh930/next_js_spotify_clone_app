import {TbPlaylist} from 'react-icons/tb'
import {AiOutlinePlus} from 'react-icons/ai'
import { TiPin } from "react-icons/ti";
import Image from 'next/image';
import liked from '../public/assets/liked.webp'
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { Accordion } from '@mantine/core';
import { PiPlaylistDuotone } from "react-icons/pi";
import { FaRecordVinyl } from "react-icons/fa6";
import music from '../public/assets/music.png'

const Library = ()=>{
    const {likedSongs, likedPlaylists, artistFollow, likedAlbums} = useSelector((state)=>state.userIteam)
    const router = useRouter();
    return(
        <div className="pb-4 flex flex-col w-full">
           <div className="flex sticky px-3 top-0 py-4 bg-neutral-900 justify-between items-center font-medium text-neutral-400">
                <div className='flex items-center gap-2'>
                    <TbPlaylist size={26}/>
                    <p>Your Library</p>
                </div>
                <AiOutlinePlus size={26} className='cursor-pointer hover:text-white transition-all duration-100'/>
           </div>
            <div className='px-3 flex flex-col w-full'>
            {
                likedSongs?.length > 0 && (
                 <div onClick={()=>router.push('/user-collection')} className='w-full py-2 px-2.5 transition cursor-pointer hover:bg-neutral-800 gap-14 rounded-lg'>
                    <div className="flex items-center justify-between group w-full transition cursor-pointer hover:bg-neutral-800 gap-14 rounded-lg">
                         <div className="flex items-center gap-4 h-14 w-full">
                             <Image width={40} height={40} className="h-full w-14 aspect-square rounded-lg" src={liked} alt="" />
                             <div className='flex flex-col justify-between '>
                                 <p className='w-full text-ellipsis whitespace-nowrap overflow-x-hidden text-sm font-medium text-neutral-100'>Liked Songs</p>
                                 <div className='flex items-center gap-1'>
                                     <TiPin color='#1ed760'/>
                                     <p className='text-sm font-medium text-neutral-400'>Playlist</p>
                                     <p className='text-sm font-medium text-neutral-400'>&#8226;</p>
                                     <p className='text-sm font-medium text-neutral-400'>{`${likedSongs.length} ${likedSongs.length === 1 ? 'song' : 'songs'}`}</p>
                                 </div>
                             </div>
                         </div>
                     </div>
                 </div>
                )
            }
                <Accordion chevron={null} hidden={likedPlaylists?.length === 0}>
                    <Accordion.Item value='My Playlist'>
                        <Accordion.Control>
                        <div className='w-[19rem] pl-2 py-2 px-2.5 transition cursor-pointer hover:bg-neutral-800 gap-14 rounded-lg'>
                            <div className="flex items-center justify-between group w-full transition cursor-pointer hover:bg-neutral-800 gap-14 rounded-lg">
                                <div className="flex items-center gap-4 h-14 w-full">
                                    <div style={{background: 'rgb(66,28,180)', background: 'linear-gradient(135deg, rgba(66,28,180,1) 0%, rgba(119,145,134,1) 100%)'}} className='h-full aspect-square rounded-lg p-2 flex justify-center items-center'>
                                        <PiPlaylistDuotone size={23} color='white'/>
                                    </div>
                                    <div className='flex flex-col justify-between '>
                                        <p className='w-full text-start text-ellipsis whitespace-nowrap overflow-x-hidden text-sm font-medium -mr-5 text-neutral-100'>Liked {likedPlaylists?.length > 1 ? 'Playlists' : 'Playlist'}</p>
                                        <div className='flex items-center gap-1'>
                                            <TiPin color='#1ed760'/>
                                            <p className='text-sm font-medium text-neutral-400'>{likedPlaylists?.length > 1 ? 'Playlists' : 'Playlist'}</p>
                                            <p className='text-sm font-medium text-neutral-400'>&#8226;</p>
                                            <p className='text-sm font-medium text-neutral-400'>Spotify</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </Accordion.Control>
                        <Accordion.Panel>
                        {
                            likedPlaylists?.length > 0 && likedPlaylists.map((playlist)=>(
                            <div onClick={()=>router.push(`/playlist/${playlist.id}`)} className='w-full py-2 pl-4 px-2.5 transition cursor-pointer hover:bg-neutral-800 gap-14 rounded-lg'>
                                <div className="flex items-center justify-between group w-full transition cursor-pointer hover:bg-neutral-800 gap-14 rounded-lg">
                                    <div className="flex items-center gap-4 h-14 ">
                                        <Image width={40} height={40} className="h-full w-14 aspect-square rounded-lg" src={playlist.image} alt="" />
                                        <div className='flex flex-col items-start justify-between w-[calc(100%-70px)]'>
                                            <p className='text-sm font-medium text-start text-neutral-100 w-full text-ellipsis whitespace-nowrap overflow-x-hidden'>{playlist.name}</p>
                                            <div className='flex items-center gap-1'>
                                                <p className='text-xs font-medium text-neutral-400'>Playlist</p>
                                                <p className='text-xs font-medium text-neutral-400'>&#8226;</p>
                                                <p className='text-xs font-medium text-neutral-400'>Spotify</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            ))
                        }
                        </Accordion.Panel>
                    </Accordion.Item>
                </Accordion>
                <Accordion chevron={null} hidden={artistFollow?.length === 0}>
                    <Accordion.Item value='Favorite Artist'>
                        <Accordion.Control>
                        <div className='w-[19rem] pl-2 py-2 px-2.5 transition cursor-pointer hover:bg-neutral-800 gap-14 rounded-lg'>
                            <div className="flex items-center justify-between group w-full transition cursor-pointer hover:bg-neutral-800 gap-14 rounded-lg">
                                <div className="flex items-center gap-4 h-14 w-full">
                                    <div style={{background: 'rgb(66,28,180)', background: 'linear-gradient(135deg, rgba(66,28,180,1) 0%, rgba(119,145,134,1) 100%)'}} className='h-full aspect-square rounded-lg p-2 flex justify-center items-center'>
                                        <Image width={30} height={30} src={music} alt="" />
                                    </div>
                                    <div className='flex flex-col justify-between '>
                                        <p className='w-full text-start text-ellipsis whitespace-nowrap overflow-x-hidden text-sm font-medium -mr-5 text-neutral-100'>Favorite {artistFollow?.length > 1 ? 'Artists' : 'Artist'}</p>
                                        <div className='flex items-center gap-1'>
                                            <TiPin color='#1ed760'/>
                                            <p className='text-sm font-medium text-neutral-400'>{artistFollow?.length > 1 ? 'Playlists' : 'Playlist'}</p>
                                            <p className='text-sm font-medium text-neutral-400'>&#8226;</p>
                                            <p className='text-sm font-medium text-neutral-400'>Spotify</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </Accordion.Control>
                        <Accordion.Panel>
                        {
                            artistFollow?.length > 0 && artistFollow.map((artist)=>(
                            <div onClick={()=>router.push(`/artist/${artist.id}`)} className='w-full py-2 pl-4 px-2.5 transition cursor-pointer hover:bg-neutral-800 gap-14 rounded-lg'>
                                <div className="flex items-center justify-between group w-full transition cursor-pointer hover:bg-neutral-800 gap-14 rounded-lg">
                                    <div className="flex items-center gap-4 h-14 ">
                                        <Image width={40} height={40} className="h-full w-14 aspect-square rounded-full" src={artist.image} alt="" />
                                        <div className='flex flex-col items-start justify-between w-[calc(100%-70px)]'>
                                            <p className='text-sm font-medium text-start text-neutral-100 w-full text-ellipsis whitespace-nowrap overflow-x-hidden'>{artist.name}</p>
                                            <div className='flex items-center gap-1'>
                                                <p className='text-xs font-medium text-neutral-400'>Artist</p>
                                                <p className='text-xs font-medium text-neutral-400'>&#8226;</p>
                                                <p className='text-xs font-medium text-neutral-400'>Spotify</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            ))
                        }
                        </Accordion.Panel>
                    </Accordion.Item>
                </Accordion>
                <Accordion chevron={null} hidden={likedAlbums?.length === 0}>
                    <Accordion.Item value='My Playlist'>
                        <Accordion.Control>
                        <div className='w-[19rem] pl-2 py-2 px-2.5 transition cursor-pointer hover:bg-neutral-800 gap-14 rounded-lg'>
                            <div className="flex items-center justify-between group w-full transition cursor-pointer hover:bg-neutral-800 gap-14 rounded-lg">
                                <div className="flex items-center gap-4 h-14 w-full">
                                    <div style={{background: 'rgb(66,28,180)', background: 'linear-gradient(135deg, rgba(66,28,180,1) 0%, rgba(119,145,134,1) 100%)'}} className='h-full aspect-square rounded-lg p-2 flex justify-center items-center'>
                                        <FaRecordVinyl size={20} color='white'/>
                                    </div>
                                    <div className='flex flex-col justify-between '>
                                        <p className='w-full text-start text-ellipsis whitespace-nowrap overflow-x-hidden text-sm font-medium -mr-5 text-neutral-100'>Liked Albums</p>
                                        <div className='flex items-center gap-1'>
                                            <TiPin color='#1ed760'/>
                                            <p className='text-sm font-medium text-neutral-400'>Albums</p>
                                            <p className='text-sm font-medium text-neutral-400'>&#8226;</p>
                                            <p className='text-sm font-medium text-neutral-400'>Spotify</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </Accordion.Control>
                        <Accordion.Panel>
                        {
                            likedAlbums?.length > 0 && likedAlbums.map((playlist)=>(
                            <div onClick={()=>router.push(`/album/${playlist.id}`)} className='w-full py-2 pl-4 px-2.5 transition cursor-pointer hover:bg-neutral-800 gap-14 rounded-lg'>
                                <div className="flex items-center justify-between group w-full transition cursor-pointer hover:bg-neutral-800 gap-14 rounded-lg">
                                    <div className="flex items-center gap-4 h-14 ">
                                        <Image width={40} height={40} className="h-full w-14 aspect-square rounded-lg" src={playlist.image} alt="" />
                                        <div className='flex flex-col items-start justify-between w-[calc(100%-70px)]'>
                                            <p className='text-sm font-medium text-start text-neutral-100 w-full text-ellipsis whitespace-nowrap overflow-x-hidden'>{playlist.name}</p>
                                            <div className='flex items-center gap-1'>
                                                <p className='text-xs font-medium text-neutral-400'>Albums</p>
                                                <p className='text-xs font-medium text-neutral-400'>&#8226;</p>
                                                <p className='text-xs font-medium text-neutral-400'>{playlist.artist.split(', ')[0]}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            ))
                        }
                        </Accordion.Panel>
                    </Accordion.Item>
                </Accordion>
            </div>
        </div>
    )
}

export default Library;
