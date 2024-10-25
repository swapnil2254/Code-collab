import Select from "@/components/common/Select"
import { useSettings } from "@/context/SettingContext"
import useResponsive from "@/hooks/useResponsive"
import { editorFonts } from "@/resources/Fonts"
import { globalThemes } from "@/resources/GlobalThemes"
import { editorThemes } from "@/resources/Themes"
import { langNames } from "@uiw/codemirror-extensions-langs"
import { ChangeEvent, useEffect } from "react"

function SettingsView() {
    const {
        theme,
        setTheme,
        language,
        setLanguage,
        fontSize,
        setFontSize,
        fontFamily,
        setFontFamily,
        isSettingsModified,
        setIsSettingsModified,
        appTheme,
        setAppTheme,
        resetSettings,
    } = useSettings()
    const { viewHeight } = useResponsive()

    const handleFontFamilyChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setFontFamily(e.target.value), setIsSettingsModified(true)
    }
    const handleThemeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setTheme(e.target.value), setIsSettingsModified(true)
    }
    const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setLanguage(e.target.value), setIsSettingsModified(true)
    }
    const handleFontSizeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setFontSize(parseInt(e.target.value)), setIsSettingsModified(true)
    }
    // const handleShowGitHubCornerChange = (e: ChangeEvent<HTMLInputElement>) => {
    //     setShowGitHubCorner(e.target.checked), setIsSettingsModified(true)
    // }
    const handleAppThemeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setAppTheme(e.target.value), setIsSettingsModified(true)
    }

    useEffect(() => {
        // Set editor font family
        const editor = document.querySelector(
            ".cm-editor > .cm-scroller",
        ) as HTMLElement
        if (editor !== null) {
            editor.style.fontFamily = `${fontFamily}, monospace`
        }
    }, [fontFamily])

    return (
        <div
            className="flex flex-col items-center gap-2 p-4"
            style={{ height: viewHeight }}
        >
            <h1 className="view-title">Settings</h1>
            {/* Choose Font Family option */}
            <div className="flex w-full items-end gap-2">
                <Select
                    onChange={handleFontFamilyChange}
                    value={fontFamily}
                    options={editorFonts}
                    title="Font Family"
                />
                {/* Choose font size option */}
                <select
                    value={fontSize}
                    onChange={handleFontSizeChange}
                    className="rounded-md border-none bg-slate-100 px-4 py-2 text-dark outline-none"
                    title="Font Size"
                >
                    {[...Array(13).keys()].map((size) => {
                        return (
                            <option key={size} value={size + 12}>
                                {size + 12}
                            </option>
                        )
                    })}
                </select>
            </div>
            {/* Choose theme option */}
            <Select
                onChange={handleThemeChange}
                value={theme}
                options={Object.keys(editorThemes)}
                title="Theme"
            />
            {/* Choose language option */}
            <Select
                onChange={handleLanguageChange}
                value={language}
                options={langNames}
                title="Language"
            />
            <Select
                onChange={handleAppThemeChange}
                value={appTheme}
                options={globalThemes}
                title="Mode"
            />
            {/* Show GitHub corner option */}
            {/* <div className="mt-4 flex w-full items-center justify-between">
                <label>Show github corner</label>
                <label className="relative inline-flex cursor-pointer items-center">
                    <input
                        className="peer sr-only"
                        type="checkbox"
                        onChange={handleShowGitHubCornerChange}
                        checked={showGitHubCorner}
                    />
                    <div className="peer h-6 w-12 rounded-full bg-slate-100 outline-none duration-100 after:absolute after:left-1 after:top-1 after:flex after:h-4 after:w-4 after:items-center after:justify-center after:rounded-full after:bg-dark after:font-bold after:outline-none after:duration-500 peer-checked:after:translate-x-6 peer-checked:after:border-white peer-focus:outline-none"></div>
                </label>
            </div> */}
            <button
                className={`mt-auto w-full rounded-md border-none ${isSettingsModified ? `bg-danger` : `bg-slate-100`} px-4 py-2 text-dark outline-none`}
                onClick={resetSettings}
            >
                Reset to default
            </button>
        </div>
    )
}

export default SettingsView
