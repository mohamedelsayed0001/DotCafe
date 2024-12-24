import React, { useState } from 'react';
import { TextField, InputAdornment, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function SearchBar({setSelectedProduct}) {
    const [searchKeyword, setSearchKeyword] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const handleItemClick = (item) => {
        setSelectedProduct(item);
        setSearchResults([]); 
    };

    const sendToken = async () => {
        try {
            const response = await fetch('http://localhost:8080/menu/search?keyword=' + encodeURIComponent(searchKeyword), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setSearchResults(data);
        } catch (error) {
            console.error('Error sending search token:', error);
        }
    };

    return (
        <div style={{ position: 'relative', width: '16%', margin: '16px' }}>
            <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                height: '40px', 
                background: 'linear-gradient(to right, rgba(217, 217, 217, 0.2) 0%, rgba(208, 146, 46, 0.2) 100%)', 
                borderRadius: '20px', 
                border: '1px solid #F18A86'
            }}>
                <TextField
                    placeholder="Search..."
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendToken()}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon style={{ width: '40px', height: '35px', cursor: 'pointer' }} onClick={sendToken} />
                            </InputAdornment>
                        ),
                    }}
                    style={{ flexGrow: 1, border: 'none' }}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            border: 'none',
                        },
                        '& fieldset': {
                            border: 'none',
                        },
                    }}
                />
            </div>
            {searchResults.length > 0 && (
            <List
                    style={{
                        position: 'absolute',
                        top: '50px',
                        left: '0',
                        width: '100%',
                        background: 'linear-gradient(to right, rgba(217, 217, 217, 1) 0%, rgba(208, 146, 46, 1) 100%)',
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                        maxHeight: '200px',
                        overflowY: 'auto',
                        zIndex: 1000,
                    }}
                >
            {searchResults.map((item, index) => (
                        <ListItem
                            key={index}
                            onClick={() => handleItemClick(item)}
                            style={{
                                padding: '8px 16px',
                                borderBottom: '1px solid #ddd',
                                background: 'transparent',
                                transition: 'background-color 0.2s ease-in-out',
                            }}
                            sx={{
                                '&:hover': {
                                    backgroundColor: 'rgba(208, 146, 46, 0.1)', // Hover color matching the search bar
                                },
                            }}
                        >
                            <ListItemAvatar>
                                <Avatar
                                    src={item.src}
                                    alt={item.name}
                                    style={{ width: '40px', height: '40px', cursor: 'pointer' }}
                                />
                            </ListItemAvatar>
                            <ListItemText primary={item.name} />
                        </ListItem>
                    ))}
                </List>
            )}
        </div>
    );
}

export default SearchBar;
