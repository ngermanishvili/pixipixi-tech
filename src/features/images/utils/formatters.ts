
/**
 * @param bytes ფაილის ზომა ბაიტებში
 * @returns ფორმატირებული ფაილის ზომა შესაბამისი ერთეულით (B, KB, MB)
 */
export const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
};