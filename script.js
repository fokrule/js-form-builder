
$(document).ready(function() {

    // Hide the template data textarea initially
    $("#template-data").hide();

    // Helper function to generate a unique ID for fields
    function generateFieldId() {
        return 'field-' + Math.floor(Math.random() * (100000 - 1 + 1) + 57);
    }

    // Function to update the preview and generated HTML
    function updatePreviewAndCode() {
        let generatedHtml = '';
        let previewHtml = '';

        // Remove placeholder if fields exist
        if ($('.builder-area').children().not('.placeholder-text').length > 0) {
            $('.builder-area .placeholder-text').remove();
        } else {
            // Add placeholder if no fields are present
            if ($('.builder-area .placeholder-text').length === 0) {
                $('.builder-area').html('<p class="placeholder-text">Click a field type on the left to add it here.</p>');
            }
        }

        // Iterate through each confirmed field in the builder area to generate HTML
        $('.builder-area .form-field-wrapper[data-confirmed="true"]').each(function() {
            const $this = $(this);
            const fieldType = $this.data('field-type');
            const labelText = $this.find('.display-label').text().trim();
            const inputName = $this.find('.display-name').text().trim(); // Get the name from the display element

            let fieldOutput = '';

            switch (fieldType) {
                case 'text':
                case 'number':
                case 'email':
                case 'date':
                    const inputType = $this.find('.display-input').data('input-type'); // Get original type
                    const placeholder = $this.find('.display-input').data('placeholder') || '';
                    fieldOutput = `
                        <div class="form-group">
                            <label for="${inputName}">${labelText}</label>
                            <input type="${inputType}" class="form-control" id="${inputName}" name="${inputName}" placeholder="${placeholder}">
                        </div>`;
                    break;
                case 'textarea':
                    const textareaPlaceholder = $this.find('.display-input').data('placeholder') || '';
                    fieldOutput = `
                        <div class="form-group">
                            <label for="${inputName}">${labelText}</label>
                            <textarea class="form-control" rows="3" id="${inputName}" name="${inputName}" placeholder="${textareaPlaceholder}"></textarea>
                        </div>`;
                    break;
                case 'select':
                    let selectOptionsHtml = '';
                    $this.find('.display-options .option-item').each(function() {
                        const optionText = $(this).text().trim();
                        selectOptionsHtml += `<option>${optionText}</option>`;
                    });
                    fieldOutput = `
                        <div class="form-group">
                            <label for="${inputName}">${labelText}</label>
                            <select class="form-control" id="${inputName}" name="${inputName}">
                                ${selectOptionsHtml}
                            </select>
                        </div>`;
                    break;
                case 'radio':
                    let radioOptionsHtml = '';
                    // Use a consistent name for the radio group based on the inputName
                    $this.find('.display-options .option-item').each(function(index) {
                        const optionText = $(this).text().trim();
                        // Generate a simple value if not explicitly set
                        const optionValue = optionText.toLowerCase().replace(/\s/g, '-').replace(/[^\w-]/g, '') || `option-${index}`;
                        radioOptionsHtml += `
                            <label class="radio-inline">
                                <input type="radio" name="${inputName}" value="${optionValue}"> ${optionText}
                            </label>`;
                    });
                    fieldOutput = `
                        <div class="form-group">
                            <label>${labelText}</label>
                            <div>
                                ${radioOptionsHtml}
                            </div>
                        </div>`;
                    break;
                case 'checkbox':
                    let checkboxOptionsHtml = '';
                    $this.find('.display-options .option-item').each(function(index) {
                        const optionText = $(this).text().trim();
                        // Generate a simple value if not explicitly set
                        const optionValue = optionText.toLowerCase().replace(/\s/g, '-').replace(/[^\w-]/g, '') || `checkbox-${index}`;
                        checkboxOptionsHtml += `
                            <label class="checkbox-inline">
                                <input type="checkbox" name="${inputName}[]" value="${optionValue}"> ${optionText}
                            </label>`;
                    });
                    fieldOutput = `
                        <div class="form-group">
                            <label>${labelText}</label>
                            <div>
                                ${checkboxOptionsHtml}
                            </div>
                        </div>`;
                    break;
            }
            generatedHtml += fieldOutput;

            // For the preview, disable inputs
            const previewFieldOutput = $(fieldOutput);
            previewFieldOutput.find('input, textarea, select').attr('readonly', true).attr('disabled', true);
            previewHtml += previewFieldOutput.prop('outerHTML');
        });

        // Update preview area
        if (previewHtml.trim() === '') {
            $('.preview-area').html('<p class="placeholder-text">Your generated form will appear here.</p>');
        } else {
            $('.preview-area').html(previewHtml);
        }

        // Update generated HTML textarea
        $('#template-data').val(generatedHtml.trim());
    }


    // --- Field Addition Logic ---
    $(".add-text-field").click(function() {
        const fieldId = generateFieldId();
        const text = `
            <div class="form-field-wrapper" id="${fieldId}" data-field-type="text" data-confirmed="false">
                <span class="remove-field fa fa-times-circle" title="Remove Field"></span>
                <div class="form-group">
                    <label>Label:</label>
                    <input type="text" placeholder="Enter field label (e.g., Your Name)" class="form-control field-label-input" /><br>
                    <label>Name:</label>
                    <input type="text" placeholder="Enter field name (e.g., user_name)" class="form-control field-name-input" /><br>
                    <label>Placeholder:</label>
                    <input type="text" placeholder="Enter input placeholder (e.g., John Doe)" class="form-control field-placeholder-input" />
                </div>
                <div class="confirm-buttons">
                    <a class="text-field-confirm" data-field-id="${fieldId}"><i class="fa fa-check" style="color:green" aria-hidden="true"></i> Confirm</a>
                </div>
                <span id="${fieldId}-text-danger" class="text-danger"></span>
            </div>`;
        $(".builder-area").append(text);
        updatePreviewAndCode(); // Update to show placeholder if it was removed
    });

    $(".add-long-text-field").click(function() {
        const fieldId = generateFieldId();
        const text = `
            <div class="form-field-wrapper" id="${fieldId}" data-field-type="textarea" data-confirmed="false">
                <span class="remove-field fa fa-times-circle" title="Remove Field"></span>
                <div class="form-group">
                    <label>Label:</label>
                    <input type="text" placeholder="Enter field label (e.g., Your Message)" class="form-control field-label-input" /><br>
                    <label>Name:</label>
                    <input type="text" placeholder="Enter field name (e.g., user_message)" class="form-control field-name-input" /><br>
                    <label>Placeholder:</label>
                    <input type="text" placeholder="Enter textarea placeholder" class="form-control field-placeholder-input" />
                </div>
                <div class="confirm-buttons">
                    <a class="textarea-field-confirm" data-field-id="${fieldId}"><i class="fa fa-check" style="color:green" aria-hidden="true"></i> Confirm</a>
                </div>
                <span id="${fieldId}-text-danger" class="text-danger"></span>
            </div>`;
        $(".builder-area").append(text);
        updatePreviewAndCode();
    });

    $(".add-number-field").click(function() {
        const fieldId = generateFieldId();
        const text = `
            <div class="form-field-wrapper" id="${fieldId}" data-field-type="number" data-confirmed="false">
                <span class="remove-field fa fa-times-circle" title="Remove Field"></span>
                <div class="form-group">
                    <label>Label:</label>
                    <input type="text" placeholder="Enter field label (e.g., Quantity)" class="form-control field-label-input" /><br>
                    <label>Name:</label>
                    <input type="text" placeholder="Enter field name (e.g., item_quantity)" class="form-control field-name-input" /><br>
                    <label>Placeholder:</label>
                    <input type="text" placeholder="Enter number placeholder" class="form-control field-placeholder-input" />
                </div>
                <div class="confirm-buttons">
                    <a class="number-field-confirm" data-field-id="${fieldId}"><i class="fa fa-check" style="color:green" aria-hidden="true"></i> Confirm</a>
                </div>
                <span id="${fieldId}-text-danger" class="text-danger"></span>
            </div>`;
        $(".builder-area").append(text);
        updatePreviewAndCode();
    });

    $(".add-email-field").click(function() {
        const fieldId = generateFieldId();
        const text = `
            <div class="form-field-wrapper" id="${fieldId}" data-field-type="email" data-confirmed="false">
                <span class="remove-field fa fa-times-circle" title="Remove Field"></span>
                <div class="form-group">
                    <label>Label:</label>
                    <input type="text" placeholder="Enter field label (e.g., Your Email)" class="form-control field-label-input" /><br>
                    <label>Name:</label>
                    <input type="text" placeholder="Enter field name (e.g., user_email)" class="form-control field-name-input" /><br>
                    <label>Placeholder:</label>
                    <input type="text" placeholder="Enter email placeholder" class="form-control field-placeholder-input" />
                </div>
                <div class="confirm-buttons">
                    <a class="email-field-confirm" data-field-id="${fieldId}"><i class="fa fa-check" style="color:green" aria-hidden="true"></i> Confirm</a>
                </div>
                <span id="${fieldId}-text-danger" class="text-danger"></span>
            </div>`;
        $(".builder-area").append(text);
        updatePreviewAndCode();
    });

    $(".add-date-field").click(function() {
        const fieldId = generateFieldId();
        const text = `
            <div class="form-field-wrapper" id="${fieldId}" data-field-type="date" data-confirmed="false">
                <span class="remove-field fa fa-times-circle" title="Remove Field"></span>
                <div class="form-group">
                    <label>Label:</label>
                    <input type="text" placeholder="Enter field label (e.g., Event Date)" class="form-control field-label-input" /><br>
                    <label>Name:</label>
                    <input type="text" placeholder="Enter field name (e.g., event_date)" class="form-control field-name-input" />
                </div>
                <div class="confirm-buttons">
                    <a class="date-field-confirm" data-field-id="${fieldId}"><i class="fa fa-check" style="color:green" aria-hidden="true"></i> Confirm</a>
                </div>
                <span id="${fieldId}-text-danger" class="text-danger"></span>
            </div>`;
        $(".builder-area").append(text);
        updatePreviewAndCode();
    });

    $(".add-select-field").click(function() {
        const fieldId = generateFieldId();
        const text = `
            <div class="form-field-wrapper" id="${fieldId}" data-field-type="select" data-confirmed="false">
                <span class="remove-field fa fa-times-circle" title="Remove Field"></span>
                <div class="form-group">
                    <label>Label:</label>
                    <input type="text" placeholder="Enter field label (e.g., Choose Option)" class="form-control field-label-input" /><br>
                    <label>Name:</label>
                    <input type="text" name="" placeholder="Enter field name (e.g., selected_option)" class="form-control field-name-input" /><br>
                    <label>Options:</label>
                    <div class="options-container" id="options-${fieldId}">
                        <div class="row option-row">
                            <div class="col-md-8"><input class="form-control option-input" placeholder="Option 1 Text"/></div>
                            <div class="col-md-2"><a class="add-more-select-option"><i class="fa fa-plus-circle" style="color:green"></i></a></div>
                        </div>
                        <div class="row option-row">
                            <div class="col-md-8"><input class="form-control option-input" placeholder="Option 2 Text"/></div>
                            <div class="col-md-2"><a class="remove-select-option"><i class="fa fa-times-circle" style="color:red"></i></a></div>
                        </div>
                    </div>
                </div>
                <div class="confirm-buttons">
                    <a class="select-field-confirm" data-field-id="${fieldId}"><i class="fa fa-check" style="color:green" aria-hidden="true"></i> Confirm</a>
                </div>
                <span id="${fieldId}-text-danger" class="text-danger"></span>
            </div>`;
        $(".builder-area").append(text);
        updatePreviewAndCode();
    });

    $(".add-radio-field").click(function() {
        const fieldId = generateFieldId();
        const text = `
            <div class="form-field-wrapper" id="${fieldId}" data-field-type="radio" data-confirmed="false">
                <span class="remove-field fa fa-times-circle" title="Remove Field"></span>
                <div class="form-group">
                    <label>Label:</label>
                    <input type="text" placeholder="Enter group label (e.g., Select Gender)" class="form-control field-label-input" /><br>
                    <label>Name:</label>
                    <input type="text" placeholder="Enter group name (e.g., gender)" class="form-control field-name-input" /><br>
                    <label>Options:</label>
                    <div class="options-container" id="options-${fieldId}">
                        <div class="row option-row">
                            <div class="col-md-8"><input class="form-control option-input" placeholder="Option 1 Text"/></div>
                            <div class="col-md-2"><a class="add-more-select-option"><i class="fa fa-plus-circle" style="color:green"></i></a></div>
                        </div>
                        <div class="row option-row">
                            <div class="col-md-8"><input class="form-control option-input" placeholder="Option 2 Text"/></div>
                            <div class="col-md-2"><a class="remove-select-option"><i class="fa fa-times-circle" style="color:red"></i></a></div>
                        </div>
                    </div>
                </div>
                <div class="confirm-buttons">
                    <a class="radio-field-confirm" data-field-id="${fieldId}"><i class="fa fa-check" style="color:green" aria-hidden="true"></i> Confirm</a>
                </div>
                <span id="${fieldId}-text-danger" class="text-danger"></span>
            </div>`;
        $(".builder-area").append(text);
        updatePreviewAndCode();
    });

    $(".add-chekbox-field").click(function() { // Note: original typo "chekbox" retained for compatibility
        const fieldId = generateFieldId();
        const text = `
            <div class="form-field-wrapper" id="${fieldId}" data-field-type="checkbox" data-confirmed="false">
                <span class="remove-field fa fa-times-circle" title="Remove Field"></span>
                <div class="form-group">
                    <label>Label:</label>
                    <input type="text" placeholder="Enter group label (e.g., Select Interests)" class="form-control field-label-input" /><br>
                    <label>Name:</label>
                    <input type="text" placeholder="Enter group name (e.g., interests)" class="form-control field-name-input" /><br>
                    <label>Options:</label>
                    <div class="options-container" id="options-${fieldId}">
                        <div class="row option-row">
                            <div class="col-md-8"><input class="form-control option-input" placeholder="Option 1 Text"/></div>
                            <div class="col-md-2"><a class="add-more-select-option"><i class="fa fa-plus-circle" style="color:green"></i></a></div>
                        </div>
                        <div class="row option-row">
                            <div class="col-md-8"><input class="form-control option-input" placeholder="Option 2 Text"/></div>
                            <div class="col-md-2"><a class="remove-select-option"><i class="fa fa-times-circle" style="color:red"></i></a></div>
                        </div>
                    </div>
                </div>
                <div class="confirm-buttons">
                    <a class="checkbox-field-confirm" data-field-id="${fieldId}"><i class="fa fa-check" style="color:green" aria-hidden="true"></i> Confirm</a>
                </div>
                <span id="${fieldId}-text-danger" class="text-danger"></span>
            </div>`;
        $(".builder-area").append(text);
        updatePreviewAndCode();
    });


    // --- Confirm Field Logic (Refactored to show confirmed state in builder) ---
    function confirmField(fieldId, fieldType, inputType = null) {
        const $field = $('#' + fieldId);
        const $labelInput = $field.find('.field-label-input');
        const $nameInput = $field.find('.field-name-input');
        const $placeholderInput = $field.find('.field-placeholder-input');
        const $dangerText = $field.find('.text-danger');
        const $optionsContainer = $field.find('.options-container');

        $dangerText.text(''); // Clear previous errors

        const label = $labelInput.val().trim();
        const name = $nameInput.val().trim();
        let options = [];

        // Validate basic fields
        if (!label || !name) {
            $dangerText.text('Label and Name are required.');
            return;
        }

        // Validate options for select/radio/checkbox
        if (['select', 'radio', 'checkbox'].includes(fieldType)) {
            $optionsContainer.find('.option-input').each(function() {
                const optionVal = $(this).val().trim();
                if (optionVal) {
                    options.push(optionVal);
                }
            });
            if (options.length === 0) {
                $dangerText.text('At least one option is required.');
                return;
            }
        }

        // Mark as confirmed
        $field.attr('data-confirmed', 'true');

        // Replace inputs with display elements in the builder area
        let displayHtml = `
            <span class="remove-field fa fa-times-circle" title="Remove Field"></span>
            <div class="form-group">
                <label>Label:</label> <span class="display-label">${label}</span><br>
                <label>Name:</label> <span class="display-name">${name}</span><br>`;

        if (fieldType === 'text' || fieldType === 'number' || fieldType === 'email' || fieldType === 'textarea') {
            const placeholder = $placeholderInput.val().trim();
            displayHtml += `<label>Placeholder:</label> <span class="display-placeholder">${placeholder}</span>`;
            displayHtml += `<span class="display-input" data-input-type="${inputType || fieldType}" data-placeholder="${placeholder}" style="display:none;"></span>`; // Hidden element to store type/placeholder
        } else if (fieldType === 'date') {
            displayHtml += `<span class="display-input" data-input-type="date" style="display:none;"></span>`;
        }


        if (['select', 'radio', 'checkbox'].includes(fieldType)) {
            displayHtml += `<br><label>Options:</label><div class="display-options">`;
            options.forEach(opt => {
                displayHtml += `<span class="option-item">${opt}</span><br>`;
            });
            displayHtml += `</div>`;
        }

        displayHtml += `</div>
            <div class="confirm-buttons">
                <a class="edit-field" data-field-id="${fieldId}"><i class="fa fa-pencil" style="color:orange" aria-hidden="true"></i> Edit</a>
            </div>`;

        $field.html(displayHtml);
        updatePreviewAndCode();
    }

    // Generic handler for confirming fields
    $(document).on('click', "a.text-field-confirm", function() {
        confirmField($(this).data('field-id'), 'text', 'text');
    });
    $(document).on('click', "a.textarea-field-confirm", function() {
        confirmField($(this).data('field-id'), 'textarea');
    });
    $(document).on('click', "a.number-field-confirm", function() {
        confirmField($(this).data('field-id'), 'number', 'number');
    });
    $(document).on('click', "a.email-field-confirm", function() {
        confirmField($(this).data('field-id'), 'email', 'email');
    });
    $(document).on('click', "a.date-field-confirm", function() {
        confirmField($(this).data('field-id'), 'date', 'date');
    });
    $(document).on('click', "a.select-field-confirm", function() {
        confirmField($(this).data('field-id'), 'select');
    });
    $(document).on('click', "a.radio-field-confirm", function() {
        confirmField($(this).data('field-id'), 'radio');
    });
    $(document).on('click', "a.checkbox-field-confirm", function() {
        confirmField($(this).data('field-id'), 'checkbox');
    });


    // --- Edit Field Logic ---
    $(document).on('click', 'a.edit-field', function() {
        const fieldId = $(this).data('field-id');
        const $field = $('#' + fieldId);
        const fieldType = $field.data('field-type');

        // Get current display values
        const currentLabel = $field.find('.display-label').text().trim();
        const currentName = $field.find('.display-name').text().trim();
        const currentPlaceholder = $field.find('.display-placeholder').text().trim();

        let editHtml = `
            <span class="remove-field fa fa-times-circle" title="Remove Field"></span>
            <div class="form-group">
                <label>Label:</label>
                <input type="text" value="${currentLabel}" class="form-control field-label-input" /><br>
                <label>Name:</label>
                <input type="text" value="${currentName}" class="form-control field-name-input" /><br>`;

        if (fieldType === 'text' || fieldType === 'number' || fieldType === 'email' || fieldType === 'textarea') {
            editHtml += `<label>Placeholder:</label>
                         <input type="text" value="${currentPlaceholder}" class="form-control field-placeholder-input" />`;
        }

        if (['select', 'radio', 'checkbox'].includes(fieldType)) {
            editHtml += `<label>Options:</label>
                         <div class="options-container" id="options-${fieldId}">`;
            $field.find('.display-options .option-item').each(function() {
                const optionText = $(this).text().trim();
                editHtml += `
                    <div class="row option-row">
                        <div class="col-md-8"><input class="form-control option-input" value="${optionText}"/></div>
                        <div class="col-md-2"><a class="remove-select-option"><i class="fa fa-times-circle" style="color:red"></i></a></div>
                    </div>`;
            });
            editHtml += `
                <div class="row option-row">
                    <div class="col-md-8"><input class="form-control option-input" placeholder="Add new option"/></div>
                    <div class="col-md-2"><a class="add-more-select-option"><i class="fa fa-plus-circle" style="color:green"></i></a></div>
                </div>
            </div>`;
        }

        editHtml += `</div>
            <div class="confirm-buttons">
                <a class="${fieldType}-field-confirm" data-field-id="${fieldId}"><i class="fa fa-check" style="color:green" aria-hidden="true"></i> Update</a>
            </div>
            <span id="${fieldId}-text-danger" class="text-danger"></span>`;

        $field.html(editHtml);
        $field.attr('data-confirmed', 'false'); // Set back to unconfirmed state
    });


    // --- Add/Remove Options for Select/Radio/Checkbox ---
    $(document).on('click', "a.add-more-select-option", function() {
        const $optionsContainer = $(this).closest('.options-container');
        const generatedScript = `
            <div class="row option-row">
                <div class="col-md-8"><input class="form-control option-input" placeholder="New Option"/></div>
                <div class="col-md-2"><a class="remove-select-option"><i class="fa fa-times-circle" style="color:red"></i></a></div>
            </div>`;
        $optionsContainer.append(generatedScript);
    });

    $(document).on('click', "a.remove-select-option", function() {
        $(this).closest('.option-row').remove();
    });


    // --- Remove Field from Builder and Preview ---
    $(document).on('click', ".remove-field", function() {
        const id = $(this).closest('.form-field-wrapper').attr('id');
        $("#preview-" + id).remove(); // Remove from preview
        $("#" + id).remove(); // Remove from builder
        updatePreviewAndCode(); // Re-evaluate placeholders and code
    });


    // --- Export HTML ---
    $(document).on('click', '.export-html', function() {
        // The HTML is already in the #template-data textarea, just show it and allow copy
        $("#template-data").show();
        $("#template-data").select(); // Select all text in the textarea
        try {
            document.execCommand('copy');
            // Using a custom message box instead of alert()
            // For simplicity, I'll use a basic alert here, but in a real app,
            // you'd replace this with a Bootstrap modal or similar.
            alert('HTML copied to clipboard!');
        } catch (err) {
            console.error('Failed to copy text: ', err);
            alert('Failed to copy HTML. Please manually copy from the "Generated HTML Code" textarea.');
        }
    });

    // Initial call to set up placeholders
    updatePreviewAndCode();
});
