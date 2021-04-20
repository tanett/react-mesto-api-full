function renderLoading(isLoading){
    if(isLoading) {
        this._submitBtn.textContent = 'Сохранение...';

    } else {this._submitBtn.textContent = 'Сохранить';}
}

export default renderLoading;