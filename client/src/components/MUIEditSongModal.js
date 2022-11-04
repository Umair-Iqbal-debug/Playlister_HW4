import { useContext, useState } from 'react'
import GlobalStoreContext from '../store';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function MUIEditSongModal() {
    const { store } = useContext(GlobalStoreContext);
    const [ title, setTitle ] = useState(store.currentSong.title);
    const [ artist, setArtist ] = useState(store.currentSong.artist);
    const [ youTubeId, setYouTubeId ] = useState(store.currentSong.youTubeId);

    function handleConfirmEditSong() {
        let newSongData = {
            title: title,
            artist: artist,
            youTubeId: youTubeId
        };
        store.addUpdateSongTransaction(store.currentSongIndex, newSongData);        
    }

    function handleCancelEditSong() {
        store.hideModals();
    }

    function handleUpdateTitle(event) {
        setTitle(event.target.value);
    }

    function handleUpdateArtist(event) {
        setArtist(event.target.value);
    }

    function handleUpdateYouTubeId(event) {
        setYouTubeId(event.target.value);
    }

    return (
        <Modal
            open={store.isEditSongModalOpen()}
        >
            <Box sx={style}>
            <div
                id="edit-song-modal"
                className="modal-dialog"
                data-animation="slideInOutLeft">
            <div
                id='edit-song-root'
                >
                <div
                    id="edit-song-modal-header"
                    className="modal-header"
                    >
                        Edit Song
                    </div>
                <div
                    id="edit-song-modal-content"
                   >
                    <div id="title-prompt" >Title:</div>
                    <input 
                        id="edit-song-modal-title-textfield" 
                        className='modal-control'
                        type="text" 
                        defaultValue={title} 
                        onChange={handleUpdateTitle} />
                    <div id="artist-prompt" >Artist:</div>
                    <input 
                        id="edit-song-modal-artist-textfield" 
                        className='modal-control'
                        type="text" 
                        defaultValue={artist} 
                        onChange={handleUpdateArtist} />
                    <div id="you-tube-id-prompt" >You Tube Id:</div>
                    <input 
                        id="edit-song-modal-youTubeId-textfield" 
                        className='modal-control'
                        type="text" 
                        defaultValue={youTubeId} 
                        onChange={handleUpdateYouTubeId} />
                </div>
                <div className='modal-footer' >
                    <input 
                        type="button" 
                        id="edit-song-confirm-button" 
                        className='confirm-modal-button'
                        value='Confirm' 
                        onClick={handleConfirmEditSong} />
                    <input 
                        type="button" 
                        id="edit-song-cancel-button"
                        className='close-modal-button' 
                        value='Cancel' 
                        onClick={handleCancelEditSong} />
                </div>
            </div>
        </div>
            </Box>
        </Modal>
    );
}