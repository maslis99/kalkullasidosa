import { sinsData, hellsData, repentanceGuide } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    let userSins = [];
    let showAddSinList = false;
    let newSinName = '';
    let selectedSinForModal = null;
    let modalOpen = false;

    const renderHomeView = () => {
        app.innerHTML = `
            <div class="flex flex-col items-center p-8">
                <h2 class="text-3xl font-bold text-stone-800 text-center">KALKULASI DOSA</h2>
                <h3 class="text-xl text-stone-700 mb-6 text-center">Jalan Tobat & Refleksi</h3>
                <p class="text-center text-stone-600 max-w-2xl mb-8">
                    Aplikasi ini adalah alat edukasi dan refleksi diri untuk memahami konsep dosa dalam Islam berdasarkan Al-Qur'an dan Hadis. Ini bukan kalkulator, melainkan panduan untuk mendekatkan diri kepada Allah SWT.
                </p>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
                    <button id="majorSinsBtn" class="bg-rose-600 hover:bg-rose-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105">
                        Dosa-Dosa Besar
                    </button>
                    <button id="minorSinsBtn" class="bg-amber-600 hover:bg-amber-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105">
                        Dosa-Dosa Kecil
                    </button>
                    <button id="repentanceGuideBtn" class="bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105">
                        Panduan Taubat Umum
                    </button>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mt-6">
                    <button id="userSinsListBtn" class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105">
                        Daftar Dosaku
                    </button>
                    <button id="hellsInfoBtn" class="bg-stone-600 hover:bg-stone-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105">
                        Konsekuensi Dosa & Neraka
                    </button>
                </div>
                <a href="https://sahabat-digital.myr.id/galang-dana/v2/pengembangan-aplikasi-islami" target="_blank" class="mt-8 bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    Dukung Kami 
                </a>
            </div>
        `;
        setupEventListeners();
    };

    const renderSinsListView = (type) => {
        const filteredSins = sinsData.filter(sin => sin.type === type);
        const title = type === 'major' ? 'Daftar Dosa-Dosa Besar' : 'Daftar Dosa-Dosa Kecil';
        const typeDescription = type === 'major'
            ? 'Dosa-dosa ini memerlukan taubat nasuha (taubat yang sungguh-sungguh) dan dapat membawa konsekuensi yang berat di akhirat.'
            : 'Dosa-dosa ini dapat terhapus dengan menjauhi dosa besar, istighfar, dan amal kebaikan.';

        app.innerHTML = `
            <div class="p-8 max-w-4xl mx-auto">
                <button id="backHomeBtn" class="mb-6 text-teal-600 hover:text-teal-800 font-medium">
                    &larr; Kembali
                </button>
                <h2 class="text-3xl font-bold text-stone-800 mb-2">${title}</h2>
                <p class="text-stone-600 mb-8">${typeDescription}</p>
                <div class="space-y-6">
                    ${filteredSins.map(sin => `
                        <div class="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                            <h3 class="text-xl font-semibold text-stone-800">${sin.name}</h3>
                            <p class="text-stone-700 mt-2">${sin.description}</p>
                            <p class="text-sm text-stone-500 mt-3 italic">Sumber: ${sin.source}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        setupEventListeners();
    };

    const renderRepentanceView = () => {
        app.innerHTML = `
            <div class="p-8 max-w-4xl mx-auto">
                <button id="backHomeBtn" class="mb-6 text-teal-600 hover:text-teal-800 font-medium">
                    &larr; Kembali
                </button>
                <h2 class="text-3xl font-bold text-stone-800 mb-4">${repentanceGuide.title}</h2>
                <p class="text-stone-600 mb-8">
                    ${repentanceGuide.source}
                </p>
                <div class="space-y-6">
                    ${repentanceGuide.steps.map((step, index) => `
                        <div class="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                            <h3 class="text-xl font-semibold text-stone-800">${index + 1}. ${step.step}</h3>
                            <p class="text-stone-700 mt-2">${step.description}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        setupEventListeners();
    };

    const renderHellsInfoView = () => {
        app.innerHTML = `
            <div class="p-8 max-w-4xl mx-auto">
                <button id="backHomeBtn" class="mb-6 text-stone-600 hover:text-stone-800 font-medium">
                    &larr; Kembali
                </button>
                <h2 class="text-3xl font-bold text-stone-800 mb-2">Konsekuensi Dosa: Neraka</h2>
                <p class="text-stone-600 mb-8">
                    Neraka adalah tempat balasan bagi orang-orang yang melanggar perintah Allah dan Rasul-Nya. Ada berbagai tingkatan neraka, yang setiap tingkatannya memiliki hukuman berbeda sesuai dengan tingkat dosa para penghuninya.
                </p>
                <div class="space-y-6">
                    ${hellsData.map((hell, index) => `
                        <div class="bg-rose-50 p-6 rounded-xl shadow-lg border border-rose-200">
                            <h3 class="text-xl font-semibold text-rose-800">${hell.name}</h3>
                            <p class="text-stone-700 mt-2">${hell.description}</p>
                            <p class="text-sm text-stone-500 mt-3 italic">Sumber: ${hell.source}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        setupEventListeners();
    };

    const renderUserSinsListView = () => {
        app.innerHTML = `
            <div class="p-8 max-w-4xl mx-auto">
                <button id="backHomeBtn" class="mb-6 text-teal-600 hover:text-teal-800 font-medium">
                    &larr; Kembali
                </button>
                <h2 class="text-3xl font-bold text-stone-800 mb-4">Daftar Dosaku</h2>
                <p class="text-stone-600 mb-6">
                    Catat dosa yang ingin Anda renungkan.
                </p>
                
                <button id="toggleAddSinBtn" class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-lg shadow transition-colors w-full mb-4">
                    ${showAddSinList ? 'Tutup Daftar Pilihan' : 'Pilih Dosa atau Catat Baru'}
                </button>
                
                ${showAddSinList ? `
                    <div class="bg-stone-100 p-4 rounded-xl shadow border border-stone-200 max-h-96 overflow-y-auto mb-6">
                        <h4 class="text-xl font-semibold mb-3 text-stone-800">Pilih Dosa dari Daftar Standar</h4>
                        ${sinsData.map((sin) => `
                            <button class="add-sin-btn w-full text-left p-3 my-1 bg-white hover:bg-stone-200 rounded-lg shadow-sm transition-colors border border-stone-100" data-sin-id="${sin.id}">
                                ${sin.name} <span class="ml-2 text-xs font-semibold uppercase ${sin.type === 'major' ? 'text-rose-500' : 'text-amber-500'}">(${sin.type === 'major' ? 'Besar' : 'Kecil'})</span>
                            </button>
                        `).join('')}
                        
                        <h4 class="text-xl font-semibold mt-6 mb-3 text-stone-800">Catat Dosa yang Pernah Anda Lakukan</h4>
                        <div class="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                            <input id="newSinInput" type="text" placeholder="Contoh: Terlalu boros dalam belanja" value="${newSinName}" class="flex-grow w-full sm:w-auto p-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors" />
                            <button id="addCustomSinBtn" class="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-lg shadow transition-colors w-full sm:w-auto">
                                Tambah
                            </button>
                        </div>
                    </div>
                ` : ''}

                <div class="mt-6 space-y-4">
                    ${userSins.length === 0 ? `
                        <p class="text-stone-500 italic">Daftar Anda masih kosong. Tambahkan dosa untuk memulai refleksi.</p>
                    ` : `
                        ${userSins.map(sin => `
                            <div class="bg-white p-5 rounded-xl shadow-lg border border-stone-200 flex items-center justify-between">
                                <div class="flex-grow">
                                    <h3 class="text-xl font-semibold text-stone-800">${sin.name}</h3>
                                    <p class="text-stone-500 text-sm mt-1">
                                        Dicatat pada: ${new Date(sin.timestamp).toLocaleString('id-ID', { dateStyle: 'long', timeStyle: 'short' })}
                                    </p>
                                </div>
                                <div class="flex items-center space-x-2">
                                    <button class="open-modal-btn bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-4 rounded-lg shadow transition-colors" data-sin-id="${sin.id}" data-is-custom="${sin.isCustom}">
                                        Lihat Cara Bertobat
                                    </button>
                                    <button class="delete-sin-btn text-rose-500 hover:text-rose-700 transition-colors" data-sin-id="${sin.id}">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    `}
                </div>
            </div>
        `;
        setupEventListeners();
    };

    const renderModal = (sin) => {
        selectedSinForModal = sin;
        modalOpen = true;
        const isCustomSin = sin.isCustom;
        const modalContent = isCustomSin ? `
            <div class="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 class="text-lg font-semibold text-blue-800 mb-2">Panduan Taubat:</h4>
                <p class="text-gray-700 mb-4">Untuk dosa yang tidak ada di daftar, berikut adalah panduan taubat umum yang berlaku untuk setiap dosa:</p>
                <ol class="list-decimal list-inside space-y-2 text-gray-800">
                    ${repentanceGuide.steps.map(step => `
                        <li><span class="font-semibold">${step.step}:</span> ${step.description}</li>
                    `).join('')}
                </ol>
                <p class="text-sm text-blue-700 font-medium italic mt-4">${repentanceGuide.source}</p>
            </div>
        ` : `
            <p class="text-gray-700 mb-4">${sin.description}</p>
            <p class="text-sm text-gray-500 italic mb-6">Sumber: ${sin.source}</p>
            <div class="bg-rose-50 p-4 rounded-lg border border-rose-200">
                <h4 class="text-lg font-semibold text-rose-800 mb-2">Cara Bertaubat:</h4>
                <p class="text-gray-800 mb-4">${sin.repentance}</p>
                <p class="text-sm text-rose-700 font-medium italic">${sin.repentanceSource}</p>
            </div>
        `;

        const modalHtml = `
            <div id="modalOverlay" class="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4 z-50">
                <div class="bg-white rounded-xl shadow-2xl p-6 md:p-8 max-w-lg w-full transform transition-all duration-300 scale-100">
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="text-2xl font-bold text-rose-600">${sin.name}</h3>
                        <button id="closeModalBtn" class="text-gray-500 hover:text-gray-800 text-3xl font-light leading-none">&times;</button>
                    </div>
                    ${modalContent}
                    <div class="mt-6 text-center">
                        <button id="closeModalBtnFooter" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg transition-colors">
                            Tutup
                        </button>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHtml);

        document.getElementById('closeModalBtn').addEventListener('click', () => {
            document.getElementById('modalOverlay').remove();
            modalOpen = false;
            renderHomeView();
        });
        document.getElementById('closeModalBtnFooter').addEventListener('click', () => {
            document.getElementById('modalOverlay').remove();
            modalOpen = false;
            renderHomeView();
        });
    };

    const setupEventListeners = () => {
        const majorSinsBtn = document.getElementById('majorSinsBtn');
        if (majorSinsBtn) majorSinsBtn.addEventListener('click', () => renderSinsListView('major'));

        const minorSinsBtn = document.getElementById('minorSinsBtn');
        if (minorSinsBtn) minorSinsBtn.addEventListener('click', () => renderSinsListView('minor'));

        const repentanceGuideBtn = document.getElementById('repentanceGuideBtn');
        if (repentanceGuideBtn) repentanceGuideBtn.addEventListener('click', () => renderRepentanceView());
        
        const userSinsListBtn = document.getElementById('userSinsListBtn');
        if (userSinsListBtn) userSinsListBtn.addEventListener('click', () => {
            showAddSinList = false;
            renderUserSinsListView();
        });

        const hellsInfoBtn = document.getElementById('hellsInfoBtn');
        if (hellsInfoBtn) hellsInfoBtn.addEventListener('click', () => renderHellsInfoView());

        const backHomeBtn = document.getElementById('backHomeBtn');
        if (backHomeBtn) backHomeBtn.addEventListener('click', () => renderHomeView());

        const toggleAddSinBtn = document.getElementById('toggleAddSinBtn');
        if (toggleAddSinBtn) {
            toggleAddSinBtn.addEventListener('click', () => {
                showAddSinList = !showAddSinList;
                renderUserSinsListView();
            });
        }

        const addCustomSinBtn = document.getElementById('addCustomSinBtn');
        if (addCustomSinBtn) {
            addCustomSinBtn.addEventListener('click', () => {
                const input = document.getElementById('newSinInput');
                newSinName = input.value;
                if (newSinName.trim() !== '') {
                    const newSin = {
                        id: Date.now(),
                        name: newSinName.trim(),
                        description: 'Dosa personal yang Anda tambahkan.',
                        source: 'Catatan pribadi.',
                        isCustom: true,
                    };
                    userSins.push(newSin);
                    newSinName = '';
                    showAddSinList = false;
                    renderUserSinsListView();
                }
            });
        }

        document.querySelectorAll('.add-sin-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const sinId = parseInt(e.currentTarget.dataset.sinId);
                const sinToAdd = sinsData.find(sin => sin.id === sinId);
                if (sinToAdd && !userSins.find(sin => sin.id === sinId)) {
                    userSins.push({ ...sinToAdd, timestamp: new Date() });
                    showAddSinList = false;
                    renderUserSinsListView();
                }
            });
        });

        document.querySelectorAll('.open-modal-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const sinId = parseInt(e.currentTarget.dataset.sinId);
                const isCustom = e.currentTarget.dataset.isCustom === 'true';
                const sinToDisplay = isCustom ? userSins.find(sin => sin.id === sinId) : sinsData.find(sin => sin.id === sinId);
                if (sinToDisplay) {
                    renderModal(sinToDisplay);
                }
            });
        });

        document.querySelectorAll('.delete-sin-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const sinId = parseInt(e.currentTarget.dataset.sinId);
                userSins = userSins.filter(sin => sin.id !== sinId);
                renderUserSinsListView();
            });
        });
    };

    renderHomeView();
});
