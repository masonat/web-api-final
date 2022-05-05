import React, {useState} from 'react';
import {Button, Form, InputGroup, FormControl} from 'react-bootstrap'
import {useNavigate} from "react-router-dom";


const SearchBox = () => {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const submitHandler = (e) => {
        e.preventDefault();
        navigate(query ? `/search/?query=${query}` : '/search');
    };

    return (
        <Form className="d-flex me-auto" onSubmit={submitHandler}>
            <InputGroup>
                <FormControl
                    type="text"
                    name="q"
                    id="q"
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Enter Name..."
                    aria-label="Search Products"
                    aria-describedby="button-search"
                    className="rounded"
                ></FormControl>
                <Button className="btn rounded" type="submit" id="button-search">
                    <i className="fas fa-search"></i>
                </Button>
            </InputGroup>
        </Form>
    );
};
export default SearchBox
