import React, { useState, useEffect } from "react";
import authorsService from "../../services/authorsService";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function AuthorForm({ onClose, onAuthorAdded, onAuthorUpdated, isEditing, author, showSuccessToast }) {
    const [formData, setFormData] = useState({
        name: "",
        birthDate: "",
        country: "",
        bio: ""
    });
    const [birthDate, setBirthDate] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    // Set selected author in the form
    useEffect(() => {
        if (isEditing && author) {
            setFormData({
                name: author.name || "",
                birthDate: author.birthDate || "",
                country: author.country || "",
                bio: author.bio || ""
            });
            
            if (author.birthDate) {
                setBirthDate(new Date(author.birthDate));
            }
        } else {
            setFormData({
                name: "",
                birthDate: "",
                country: "",
                bio: ""
            });
            setBirthDate(null);
        }
    }, [isEditing, author]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        
        // Clear error for the field
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ""
            });
        }
    };

    const handleDateChange = (date) => {
        setBirthDate(date);
        setFormData({
            ...formData,
            birthDate: date ? date.toISOString().split('T')[0] : ""
        });
        
        // Clear error for the field
        if (errors.birthDate) {
            setErrors({
                ...errors,
                birthDate: ""
            });
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.name.trim()) {
            newErrors.name = "Author name is required";
        }
        
        if (!formData.birthDate) {
            newErrors.birthDate = "Birth date is required";
        }
        
        if (!formData.country.trim()) {
            newErrors.country = "Country is required";
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }
        
        setIsSubmitting(true);
        
        try {
            if (isEditing) {
                // Update author
                const response = await authorsService.updateAuthor(author.id, formData);
                onAuthorUpdated(response.data);
                showSuccessToast('Author updated successfully');
                onClose();
            } else {
                // Add author
                const response = await authorsService.createAuthor(formData);
                onAuthorAdded(response.data);
                showSuccessToast('Author added successfully');
                onClose();
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error(error.response?.data?.message || 'An error occurred');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form className="edit-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="name">Author Name</label>
                <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={errors.name ? "error" : ""}
                    placeholder="Enter author's full name"
                />
                {errors.name && <div className="error-text">{errors.name}</div>}
            </div>
            
            <div className="form-group">
                <label htmlFor="birthDate">Birth Date</label>
                <DatePicker
                    id="birthDate"
                    selected={birthDate}
                    onChange={handleDateChange}
                    className={errors.birthDate ? "error" : ""}
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Select birth date"
                    maxDate={new Date()}
                    showYearDropdown
                    scrollableYearDropdown
                    yearDropdownItemNumber={100}
                />
                {errors.birthDate && <div className="error-text">{errors.birthDate}</div>}
            </div>
            
            <div className="form-group">
                <label htmlFor="country">Country</label>
                <input
                    id="country"
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className={errors.country ? "error" : ""}
                    placeholder="Enter country of origin"
                />
                {errors.country && <div className="error-text">{errors.country}</div>}
            </div>
            
            <div className="form-group">
                <label htmlFor="bio">Biography (Optional)</label>
                <textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    placeholder="Enter a brief biography of the author"
                    rows={4}
                />
            </div>
            
            <div className="form-actions">
                <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={onClose}
                    disabled={isSubmitting}
                >
                    Cancel
                </button>
                <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <span className="loading-spinner"></span>
                    ) : isEditing ? (
                        "Update Author"
                    ) : (
                        "Add Author"
                    )}
                </button>
            </div>
        </form>
    );
}

export default AuthorForm;