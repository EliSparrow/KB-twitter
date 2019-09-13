import React, { useEffect, useState, Fragment } from "react";
import { Link, withRouter, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile, getCurrentProfile } from "../../actions/profile";

const Createprofile = ({
    createProfile,
    getCurrentProfile,
    profile: { profile, loading },
    history,
}) => {
    const [formData, setFormData] = useState({
        admin: "",
        suspended: "",
        avatar: "",
        description: "",
        language: "",
        website: "",
    });
    const [displaySocialInputs, toggleSocialInputs] = useState(false);
    const {
        admin,
        suspended,
        avatar,
        description,
        language,
        website,
    } = formData;
    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = e => {
        e.preventDefault();
        createProfile(formData, history);
    };
    useEffect(() => {
        getCurrentProfile();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getCurrentProfile]);
    return loading && profile === null ? (
        <Redirect to='/dashboard' />
    ) : (
            <Fragment>

                <form className='form' onSubmit={e => onSubmit(e)}>
                    <small className='form-text'>
                        Give us an idea of you
</small>
                    <div className='form-group'>
                        <input
                            type='text'
                            placeholder='Description'
                            name='description'
                            value={description}
                            onChange={e => onChange(e)}
                        />
                    </div>

                    <div className='form-group'>
                        <input
                            type='text'
                            placeholder='Language'
                            name='language'
                            value={language}
                            onChange={e => onChange(e)}
                        />
                    </div>


                    <div className='form-group'>
                        <input
                            type='text'
                            placeholder='Website'
                            name='website'
                            value={website}
                            onChange={e => onChange(e)}
                        />
                    </div>


                    <div className='form-group'>
                        <input
                            type='button'
                            placeholder='Suspended'
                            name='suspended'
                            value={suspended}
                            onChange={e => onChange(e)}
                        />
                    </div>

                    <input type='submit' className='btn btn-primary my-1' />
                    <Link className='btn btn-light my-1' to='/dashboard'>
                        Go Back
        </Link>
                </form>
            </Fragment>
        );
};


Createprofile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
    profile: state.profile,
});
export default connect(
    mapStateToProps,
    { createProfile, getCurrentProfile },
)(withRouter(Createprofile));