export function sliceContent(content, maxLength = 15) {
    if (content.length <= maxLength) {
        return content;
    }
    return content.split(' ').slice(0, maxLength).join(' ') + (content.split(' ').length > 15 ? '...' : '');


}