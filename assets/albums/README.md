# Photo Albums

This directory contains photo albums organized by location. Each album has the following structure:

```
albums/
├── istanbul/
│   ├── cover.jpg         # Album cover photo
│   └── photos/           # Directory containing all photos for this album
├── vienna/
│   ├── cover.jpg
│   └── photos/
├── budapest/
│   ├── cover.jpg
│   └── photos/
└── paris/
    ├── cover.jpg
    └── photos/
```

## Adding Photos

1. Choose the appropriate location directory
2. Add your photos to the `photos/` subdirectory
3. Select a cover photo and save it as `cover.jpg` in the album directory
4. Photos will be automatically loaded and displayed in the album view

## Photo Guidelines

- Supported formats: JPG, PNG, WebP
- Recommended size: 1920px on the longest side
- Keep file sizes reasonable (compress if needed)
- Use descriptive filenames (e.g., `blue-mosque-interior.jpg`)
- Optional: Add EXIF data for camera settings and location
