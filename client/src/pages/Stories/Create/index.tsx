import React, { useCallback, useRef, useState } from 'react';
import StoriesLayout from "../../../layouts/StoriesLayout";
import { Box, ButtonBase, Typography } from "@mui/material";
import styles from './styles.module.scss'
import ImageIcon from '@mui/icons-material/Image';
import Cropper from 'react-easy-crop'

interface IProps {

}

const CreateStories: React.FC<IProps> = () => {
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [storyPreview, setstoryPreview] = useState("")
    const storyRef = useRef<any>(null);
    const [zoom, setZoom] = useState(0.5)

    const chooseImageStory = (e: any) => {
        const file = e.target.files[0];

        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = () => {
            setstoryPreview(reader.result as string);
            storyRef.current.value = null;
        }
    }

    const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
        console.log(croppedArea, croppedAreaPixels)
    }, [])

    return <>
        <StoriesLayout>
            <Box className={styles.root}>
                {!storyPreview ? (
                    <ButtonBase className={styles.createButton}>
                        <label htmlFor='story_file' className="wrapper-ab"></label>
                        <input type="file" onChange={chooseImageStory} ref={storyRef} hidden id="story_file" />
                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
                            <Box className={styles.wrapperIcon}>
                                <ImageIcon />
                            </Box>
                            <Typography sx={{ color: "white" }} fontWeight="bold">Tạo tin ảnh</Typography>
                        </Box>
                    </ButtonBase>
                ) : (
                    <Box className={styles.wrapperEditStory}>
                        <Typography fontWeight="bold">Xem trước</Typography>
                        <Box className={styles.wrapperImagePreview}>
                            <Cropper
                                image={storyPreview}
                                crop={crop}
                                zoom={zoom}
                                aspect={10 / 16}
                                onCropChange={setCrop}
                                onCropComplete={onCropComplete}
                                onZoomChange={setZoom}
                                showGrid={false}
                                restrictPosition={false}
                            />
                        </Box>
                    </Box>
                )}


            </Box>
        </StoriesLayout>
    </>
}

export default CreateStories;

