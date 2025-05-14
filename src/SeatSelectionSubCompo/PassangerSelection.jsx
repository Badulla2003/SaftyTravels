
import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom"
import axiosRequest from "../axios";
import '../SeatSelectionStyles/PassangerSelectionPage.css';
export function PassangerSelection() {

    const [customer, setCustomer] = useState({});
    const [savedCustomers, setSavedCustomers] = useState([]);

    const addValuesToCustomer = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setCustomer((pre) => ({ ...pre, [name]: value }));

        p.current = customer

    }

 



    useEffect(() => {
        getAllRegisteredPassangers();
    }, [])

    const deleteSavedCustomer = async (id) => {
        console.log("delete clicked")
        await axiosRequest.get('/removeCustomer',
            {
                params: {
                    customerId: id
                }
            })
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
        getAllRegisteredPassangers();
    }

    const saveCustomer = async (customer) => {
        console.log("save customer ", customer);
        await axiosRequest.post('/addCustomer', customer)
            .then((response) => console.log(response)).catch((err) => console.log(err));
        getAllRegisteredPassangers();
        setMakeAddPassanger(!makeAddPassanger);
    }



    async function getAllRegisteredPassangers() {
        console.log("getAllPassworking");
        await axiosRequest.get('/getAllSavedPassangers')
            .then((res) => setSavedCustomers(res.data))
            .catch((err) => console.log(err));
        console.log("running")
    }


    const [makeAddPassanger, setMakeAddPassanger] = useState(true);

    const makeAddPassangerDiv = () => {
        setMakeAddPassanger(!makeAddPassanger);
    }


    return (
        <>
            <div className="passangersDetailsDiv">
                <h3>select passanger</h3>

                <div className="passangersSelectionDiv">
                    {
                        savedCustomers == ''
                            ? "no data"
                            : savedCustomers.map((customer) => {
                                return (
                                    <>
                                        <div className="passangerDiv">
                                            <label className="passangerName">{customer.name}</label><input type="button" className="selectButton" value="select" name={customer.name} />
                                            <input type="submit" value="delete" className="deleteButton" onClick={(event) => {
                                                event.preventDefault();
                                                deleteSavedCustomer(customer.customerId)
                                            }
                                            } />
                                        </div>
                                    </>
                                )
                            })
                    }

                    <input type="submit" className="addButton" value="Add Passanger" onClick={makeAddPassangerDiv} />

                </div>
            </div>

            {
                makeAddPassanger
                    ? ''
                    :
                    <div className="passangerRegisterDiv">
                        <h1>Add passanger</h1>
                        <div>
                            <label htmlFor="name">name </label><input type="text" name="name" value={customer.name} onChange={addValuesToCustomer} />
                        </div>

                        <div>
                            <label htmlFor="email">email </label><input type="text" name="email" value={customer.email} onChange={addValuesToCustomer} />

                        </div>
                        <div>
                            <label htmlFor="age">age </label><input type="text" name="age" value={customer.age} onChange={addValuesToCustomer} />
                        </div>
                        <div>
                            <label htmlFor="phone">phone </label><input type="text" name="phoneNumber" value={customer.phoneNumber} onChange={addValuesToCustomer} />
                        </div>
                        <div>
                            <label htmlFor="place">place </label><input type="text" name="place" value={customer.place} onChange={addValuesToCustomer} />
                        </div>
                        <div>
                            <label htmlFor="city">city </label><input type="text" name="city" value={customer.city} onChange={addValuesToCustomer} />
                        </div>

                        <div className="saveButtonDiv">
                            <input type="submit" value="save" className="saveButton" onClick={(event) => {
                                event.preventDefault();
                                saveCustomer(customer)
                            }
                            } />
                        </div>
                    </div>

            }
        </>
    )
}