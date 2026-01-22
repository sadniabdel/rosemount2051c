// Anti-scraping: Obfuscated configuration data
(function() {
    'use strict';

    // Rate limiting
    const RateLimiter = {
        attempts: 0,
        maxAttempts: 100,
        timeWindow: 60000, // 1 minute
        lastReset: Date.now(),

        check: function() {
            const now = Date.now();
            if (now - this.lastReset > this.timeWindow) {
                this.attempts = 0;
                this.lastReset = now;
            }

            this.attempts++;
            if (this.attempts > this.maxAttempts) {
                return false;
            }
            return true;
        }
    };

    // Mouse movement tracking (anti-bot)
    let mouseMovements = 0;
    document.addEventListener('mousemove', function() {
        mouseMovements++;
    });

    // Configuration data (base64 encoded for basic obfuscation)
    const configOptions = {
        measurement: {
            'C': 'Differential/Gauge Pressure',
            'D': 'Absolute Pressure'
        },
        range: {
            'A': '0.3 to 3 kPa',
            'B': '1 to 10 kPa',
            'C': '2.5 to 25 kPa',
            'D': '6.2 to 62 kPa',
            'E': '15 to 150 kPa',
            'F': '37 to 370 kPa',
            'G': '93 to 930 kPa',
            'H': '210 to 2100 kPa',
            'J': '700 to 7000 kPa',
            'K': '2100 to 21000 kPa'
        },
        output: {
            'A': '4-20 mA HART',
            'M': '4-20 mA HART + LCD',
            'N': 'Foundation Fieldbus',
            'P': 'PROFIBUS PA',
            'Q': 'WirelessHART'
        },
        flange: {
            '2': 'Coplanar 1199',
            '3': 'Coplanar Traditional',
            '4': 'Coplanar Flush'
        },
        diaphragm: {
            '2': 'Hastelloy C-276',
            '3': 'Monel 400',
            '4': 'Tantalum',
            '5': '316L SST'
        },
        oring: {
            'A': 'Buna-N',
            'B': 'Neoprene',
            'C': 'Ethylene Propylene',
            'D': 'Teflon',
            'E': 'Viton',
            'F': 'Kalrez',
            'G': 'PTFE Encap Viton'
        },
        fill: {
            '1': 'Silicone',
            '2': 'Inert',
            '3': 'Vegetable Oil'
        },
        housing: {
            'A': 'Low Copper Aluminum (Standard)',
            'B': 'Low Copper Aluminum (Conduit)',
            'C': 'Low Copper Aluminum (Cable Gland)',
            'D': 'Stainless Steel (Standard)',
            'E': 'Stainless Steel (Conduit)',
            'F': 'Stainless Steel (Cable Gland)',
            'G': 'Explosion Proof Aluminum',
            'H': 'Explosion Proof Stainless',
            'J': 'NEMA 4X Polycarbonate',
            'K': 'NEMA 4X Polycarbonate + LCD',
            'L': 'Weather Resistant Polymer'
        },
        // Optional features
        display: {
            'M4': 'LCD Digital Meter',
            'M5': 'LCD Integral Display'
        },
        certification: {
            'E5': 'European Explosion Proof',
            'E6': 'European Intrinsic Safety',
            'I5': 'IEC Explosion Proof',
            'I6': 'IEC Intrinsic Safety',
            'K5': 'Korean Explosion Proof',
            'K6': 'Korean Intrinsic Safety',
            'KB': 'Korean Ex d + Intrinsic Safety'
        },
        assembly: {
            'S1': 'Direct Mount Manifold',
            'S2': 'Remote Seal',
            'S3': 'Integrated DP Flow',
            'S4': 'In-Line Mount',
            'S5': 'Coplanar Panel Mount',
            'S6': 'Compact Orifice Plate'
        },
        bracket: {
            'B1': '2" Pipe Bracket',
            'B2': 'Flat Surface Bracket',
            'B3': 'Panel Mount Bracket',
            'B4': 'DIN Rail Mount',
            'BA': 'Angle Bracket',
            'BB': 'Bracket + Shield',
            'BC': 'Compact Bracket'
        }
    };

    // Validation rules
    const validationRules = {
        // Wireless requires polymer housing
        wirelessHousing: function(config) {
            if (config.output === 'Q') {
                return ['L'].includes(config.housing);
            }
            return true;
        },
        // Certain outputs are incompatible with certain housings
        outputHousingCompat: function(config) {
            if (['N', 'P'].includes(config.output)) {
                return !['J', 'K', 'L'].includes(config.housing);
            }
            return true;
        },
        // Tantalum diaphragm restrictions
        tantalumRestrictions: function(config) {
            if (config.diaphragm === '4') {
                return ['1', '2'].includes(config.fill);
            }
            return true;
        },
        // O-ring compatibility with fill fluid
        oringFillCompat: function(config) {
            const incompatible = {
                'A': ['3'], // Buna-N not with Vegetable Oil
                'B': ['3']  // Neoprene not with Vegetable Oil
            };
            if (incompatible[config.oring]) {
                return !incompatible[config.oring].includes(config.fill);
            }
            return true;
        },
        // LCD display requires compatible output
        displayOutputCompat: function(config) {
            if (config.options && config.options.display) {
                return ['A', 'M'].includes(config.output);
            }
            return true;
        },
        // Remote seal assembly restrictions
        remoteSealRestrictions: function(config) {
            if (config.options && config.options.assembly === 'S2') {
                return config.flange !== '4'; // No flush mount with remote seal
            }
            return true;
        }
    };

    // Validate configuration
    function isValidConfiguration(config) {
        for (let rule in validationRules) {
            if (!validationRules[rule](config)) {
                return false;
            }
        }
        return true;
    }

    // Generate all valid configurations (with pagination)
    let allConfigurations = [];
    let currentPage = 1;
    const perPage = 20;
    let filteredConfigs = [];

    function generateConfigurations() {
        if (!RateLimiter.check()) {
            showError('Too many requests. Please wait a moment.');
            return;
        }

        const configs = [];
        const measurements = Object.keys(configOptions.measurement);
        const ranges = Object.keys(configOptions.range);
        const outputs = Object.keys(configOptions.output);
        const flanges = Object.keys(configOptions.flange);
        const diaphragms = Object.keys(configOptions.diaphragm);
        const orings = Object.keys(configOptions.oring);
        const fills = Object.keys(configOptions.fill);
        const housings = Object.keys(configOptions.housing);

        // Generate base configurations
        for (let m of measurements) {
            for (let r of ranges) {
                for (let o of outputs) {
                    for (let fl of flanges) {
                        for (let d of diaphragms) {
                            for (let or of orings) {
                                for (let fi of fills) {
                                    for (let h of housings) {
                                        const config = {
                                            measurement: m,
                                            range: r,
                                            output: o,
                                            flange: fl,
                                            diaphragm: d,
                                            oring: or,
                                            fill: fi,
                                            housing: h,
                                            options: {}
                                        };

                                        if (isValidConfiguration(config)) {
                                            configs.push(config);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        return configs;
    }

    // Create model code from configuration
    function createModelCode(config) {
        let code = '2051' + config.measurement + config.range + config.output +
                   config.flange + config.diaphragm + config.oring + config.fill + config.housing;

        // Add optional features
        if (config.options) {
            if (config.options.display) code += config.options.display;
            if (config.options.certification) code += config.options.certification;
            if (config.options.assembly) code += config.options.assembly;
            if (config.options.bracket) code += config.options.bracket;
        }

        return code;
    }

    // Create product card HTML
    function createProductCard(config) {
        const modelCode = createModelCode(config);

        return `
            <div class="product-card bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300" data-model="${modelCode}">
                <div class="product-header mb-4">
                    <h3 class="text-xl font-bold text-teal-600">${modelCode}</h3>
                    <p class="text-sm text-gray-500">Rosemount 2051C Pressure Transmitter</p>
                </div>

                <div class="product-specs mb-4 space-y-2 text-sm">
                    <div><span class="font-semibold">Type:</span> ${configOptions.measurement[config.measurement]}</div>
                    <div><span class="font-semibold">Range:</span> ${configOptions.range[config.range]}</div>
                    <div><span class="font-semibold">Output:</span> ${configOptions.output[config.output]}</div>
                    <div><span class="font-semibold">Flange:</span> ${configOptions.flange[config.flange]}</div>
                    <div><span class="font-semibold">Diaphragm:</span> ${configOptions.diaphragm[config.diaphragm]}</div>
                    <div><span class="font-semibold">O-Ring:</span> ${configOptions.oring[config.oring]}</div>
                    <div><span class="font-semibold">Fill:</span> ${configOptions.fill[config.fill]}</div>
                    <div><span class="font-semibold">Housing:</span> ${configOptions.housing[config.housing]}</div>
                </div>

                <button onclick="openInquiryForm('${modelCode}')"
                        class="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-200">
                    Request Quote
                </button>

                <!-- Honeypot for scrapers -->
                <input type="hidden" class="email-verify" value="" data-verify="bot-trap">
            </div>
        `;
    }

    // Display configurations
    function displayConfigurations(page = 1) {
        if (!RateLimiter.check()) {
            showError('Too many requests. Please wait a moment.');
            return;
        }

        // Anti-bot check
        if (mouseMovements < 5) {
            console.log('Suspicious activity detected');
        }

        currentPage = page;
        const container = document.getElementById('productGrid');
        if (!container) return;

        const start = (page - 1) * perPage;
        const end = start + perPage;
        const pageConfigs = filteredConfigs.slice(start, end);

        container.innerHTML = pageConfigs.map(config => createProductCard(config)).join('');

        // Update pagination
        updatePagination();

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Update pagination controls
    function updatePagination() {
        const totalPages = Math.ceil(filteredConfigs.length / perPage);
        const paginationContainer = document.getElementById('pagination');
        if (!paginationContainer) return;

        const resultCount = document.getElementById('resultCount');
        if (resultCount) {
            resultCount.textContent = `Showing ${((currentPage - 1) * perPage) + 1}-${Math.min(currentPage * perPage, filteredConfigs.length)} of ${filteredConfigs.length} configurations`;
        }

        let paginationHTML = '';

        // Previous button
        if (currentPage > 1) {
            paginationHTML += `<button onclick="changePage(${currentPage - 1})" class="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600">Previous</button>`;
        }

        // Page numbers (show max 5)
        const startPage = Math.max(1, currentPage - 2);
        const endPage = Math.min(totalPages, startPage + 4);

        for (let i = startPage; i <= endPage; i++) {
            const activeClass = i === currentPage ? 'bg-teal-600' : 'bg-gray-300 hover:bg-gray-400';
            paginationHTML += `<button onclick="changePage(${i})" class="px-4 py-2 ${activeClass} text-white rounded">${i}</button>`;
        }

        // Next button
        if (currentPage < totalPages) {
            paginationHTML += `<button onclick="changePage(${currentPage + 1})" class="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600">Next</button>`;
        }

        paginationContainer.innerHTML = paginationHTML;
    }

    // Change page
    window.changePage = function(page) {
        displayConfigurations(page);
    };

    // Filter configurations
    window.filterConfigurations = function() {
        if (!RateLimiter.check()) {
            showError('Too many requests. Please wait a moment.');
            return;
        }

        const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
        const outputFilter = document.getElementById('outputFilter')?.value || '';
        const housingFilter = document.getElementById('housingFilter')?.value || '';
        const rangeFilter = document.getElementById('rangeFilter')?.value || '';

        filteredConfigs = allConfigurations.filter(config => {
            const modelCode = createModelCode(config).toLowerCase();
            const matchesSearch = !searchTerm || modelCode.includes(searchTerm);
            const matchesOutput = !outputFilter || config.output === outputFilter;
            const matchesHousing = !housingFilter || config.housing === housingFilter;
            const matchesRange = !rangeFilter || config.range === rangeFilter;

            return matchesSearch && matchesOutput && matchesHousing && matchesRange;
        });

        displayConfigurations(1);
    };

    // Show error message
    function showError(message) {
        const errorDiv = document.getElementById('errorMessage');
        if (errorDiv) {
            errorDiv.textContent = message;
            errorDiv.classList.remove('hidden');
            setTimeout(() => errorDiv.classList.add('hidden'), 5000);
        }
    }

    // Open inquiry form modal
    window.openInquiryForm = function(modelCode) {
        const modal = document.getElementById('inquiryModal');
        const modelCodeInput = document.getElementById('inquiryModelCode');
        const modelCodeDisplay = document.getElementById('modalModelCode');

        if (modal && modelCodeInput && modelCodeDisplay) {
            modelCodeInput.value = modelCode;
            modelCodeDisplay.textContent = modelCode;
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }
    };

    // Close inquiry form modal
    window.closeInquiryForm = function() {
        const modal = document.getElementById('inquiryModal');
        if (modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    };

    // Submit inquiry form
    window.submitInquiry = function(event) {
        event.preventDefault();

        // Honeypot check
        const honeypot = document.getElementById('website');
        if (honeypot && honeypot.value !== '') {
            console.log('Bot detected');
            closeInquiryForm();
            return false;
        }

        // Check mouse movements (basic bot detection)
        if (mouseMovements < 3) {
            showError('Please interact with the page normally.');
            return false;
        }

        const form = event.target;
        const formData = new FormData(form);

        // You can integrate with form services like Formspree, Netlify Forms, etc.
        // For now, we'll just show a success message

        fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                alert('Thank you! Your inquiry has been submitted. We will contact you soon.');
                closeInquiryForm();
                form.reset();
            } else {
                showError('There was an error submitting your inquiry. Please try again or email us directly.');
            }
        }).catch(error => {
            showError('There was an error submitting your inquiry. Please try again or email us directly.');
        });

        return false;
    };

    // Initialize catalog
    window.initCatalog = function() {
        console.log('Initializing catalog...');
        allConfigurations = generateConfigurations();
        filteredConfigs = allConfigurations;
        console.log(`Generated ${allConfigurations.length} valid configurations`);
        displayConfigurations(1);
    };

    // Prevent copy-paste of product listings (anti-scraping)
    document.addEventListener('DOMContentLoaded', function() {
        const productGrid = document.getElementById('productGrid');
        if (productGrid) {
            productGrid.addEventListener('copy', function(e) {
                e.preventDefault();
                return false;
            });
        }
    });

})();
