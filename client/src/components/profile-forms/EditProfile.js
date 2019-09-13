import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';

const EditProfile = ({
    profile: { profile, loading },
    createProfile,
    getCurrentProfile,
    history
}) => {
    const [formData, setFormData] = useState({
        admin: '',
        suspended: '',
        avatar: '',
        description: '',
        language: '',
        website: '',
    });

    const [displaySocialInputs, toggleSocialInputs] = useState(false);

    useEffect(() => {
        getCurrentProfile();

        setFormData({
            admin: loading || !profile.admin ? '' : profile.admin,
            website: loading || !profile.website ? '' : profile.website,
            suspended: loading || !profile.suspended ? '' : profile.suspended,
            avatar: loading || !profile.avatar ? '' : profile.avatar,
            description: loading || !profile.description ? '' : profile.description,
            language: loading || !profile.language ? '' : profile.language
        });
    }, [loading, getCurrentProfile]);

    const {
        admin,
        website,
        suspended,
        avatar,
        description,
        language
    } = formData;

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        createProfile(formData, history, true);
    };

    return(
        <Fragment>
               <h1 className='large text-primary'>Edit Your Profile</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Add some changes to your profile
      </p>
      <small>* = required field</small>
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
    )
};






    EditProfile.propTypes = {
        createProfile: PropTypes.func.isRequired,
        getCurrentProfile: PropTypes.func.isRequired,
        profile: PropTypes.object.isRequired
    };

    const mapStateToProps = state => ({
        profile: state.profile
    });

    export default connect(
        mapStateToProps,
        { createProfile, getCurrentProfile }
    )(withRouter(EditProfile));