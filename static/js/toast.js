



function createToast(type, title, text) {
    let notifications = $('#notifications');
    let newToast = document.createElement('div');
    let iconClass = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" /></svg>`
    if( type === 'success' ){
    iconClass = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>`

    } else if (type === 'error') {
        iconClass = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>`
    } else if (type === 'info') {
        iconClass = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" /></svg>`
    }
    newToast.innerHTML = `
        <div class="toast ${type} grid grid-cols-3 gap-4 items-center px-4 py-2 text-white mb-4 rounded">
            <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-yellow-500 bg-yellow-100 rounded-lg dark:bg-yellow-800 dark:text-yellow-200">
                ${iconClass}
                <span class="sr-only">Warning icon</span>
            </div>     
            <div class="col-span-2 content">
                <div class="text-xl font-bold title">${title}</div>
                <span>${text}</span>
            </div>
        </div>`;
    notifications.append(newToast);
    newToast.timeOut = setTimeout(() => newToast.remove(), 5000);
}

class Typewriter {
    constructor(words, elementId, typingSpeed = 100) {
        this.words = words;
        this.element = document.getElementById(elementId);
        this.typingSpeed = typingSpeed;
        this.currentWordIndex = 0;
        this.currentCharacterIndex = 0;
        this.isDeleting = false;
        this.type();
    }

    type() {
        const currentWord = this.words[this.currentWordIndex];
        if (this.isDeleting) {
            this.element.textContent = currentWord.substring(0, this.currentCharacterIndex - 1);
            this.currentCharacterIndex--;
            if (this.currentCharacterIndex === 0) {
                this.isDeleting = false;
                this.currentWordIndex = (this.currentWordIndex + 1) % this.words.length;
            }
        } else {
            this.element.textContent = currentWord.substring(0, this.currentCharacterIndex + 1);
            this.currentCharacterIndex++;
            if (this.currentCharacterIndex === currentWord.length) {
                this.isDeleting = true;
            }
        }
        setTimeout(() => this.type(), this.typingSpeed);
    }
        
    // const words = ["Hello, World!", "Welcome to my website!", "This is a typewriter effect."];
    // new Typewriter(words, "typewriter");
}

