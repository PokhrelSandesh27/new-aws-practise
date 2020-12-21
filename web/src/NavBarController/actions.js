


export const handleDrawerOpen = (store) => {
    const toggle = true;
    store.setState({toggle});
};
export const handleDrawerClose = (store) => {
    const toggle = false;
   store.setState({toggle})
};
