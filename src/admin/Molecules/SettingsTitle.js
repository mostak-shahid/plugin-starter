
export default function SettingsTitle({title, hint, description}) {
    return (
        <div className="title-wrap">
            {title &&                
                <label>
                    <span>
                        { title }
                    </span>                
                    {hint &&                 
                        <span
                            className="hints-css hint--bottom"
                            aria-label={ hint }
                        >
                            <i className="dashicons dashicons-editor-help"></i>
                        </span>
                    }
                </label>
            }
            {description &&
                <div className="description" dangerouslySetInnerHTML={{__html:description}} />
            }
        </div>
    )
}
